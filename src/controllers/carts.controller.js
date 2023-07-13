import mongoose from 'mongoose';
import { customError, errorCodes, cartsErrors, productsErrors } from '../errors/index.js';
import { cartsService, productsService, ticketsService } from '../services/index.js';
import { logger } from '../utils/index.js'
import { v4 as uuidv4 } from 'uuid';

class CartsController {
    constructor() {
        this.getCarts = this.getCarts.bind(this);
        this.addCart = this.addCart.bind(this);
        this.getCartById = this.getCartById.bind(this);
        this.addProductToCart = this.addProductToCart.bind(this);
        this.updateProductFromCart = this.updateProductFromCart.bind(this);
        this.deleteCart = this.deleteCart.bind(this);
        this.deleteProductFromCart = this.deleteProductFromCart.bind(this);
    }

    async getCarts(req, res) {
        let carts;
        try {
            carts = await cartsService.getCarts()

            if (carts) {
                res.setHeader("Content-Type", "application/json")
                res.status(200).json({
                    carts
                })
            } else {
                customError.customError('DB Error', cartsErrors.getCartsError(), errorCodes.ERROR_DB)
            }

        } catch (error) {
            logger.fatal(error)
            return res.status(error.code).json({ message: error.message })
        }

    }

    async getCartById(req, res) {
        let idCart = req.params.cid;
        let cartById;

        try {
            cartById = await cartsService.getCartById(idCart)
            if (cartById) {
                res.setHeader("Content-Type", "application/json")
                res.status(200).json({
                    cartById
                })
            } else {
                customError.customError('Invalid Cart Id', cartsErrors.getCartByIdError(idCart), errorCodes.ERROR_ARGUMENTS)
            }

        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                if (error.kind === "ObjectId") {
                    logger.error(error)
                    res.setHeader("Content-Type", "application/json")
                    return res.send({ error: 'Invalid Id format.' })
                }
            }

            logger.error(error)
            return res.status(error.code).json({ message: error.message })
        }

    }

    async addCart(req, res) {
        let newCart = {
            products: []
        }

        let cart = await cartsService.createNewCart(newCart)

        res.setHeader("Content-Type", "application/json")
        res.status(201).json({
            cart
        })

    }

    async addProductToCart(req, res) {
        let idCart = req.params.cid;
        let idProd = req.params.pid;
        let cart;
        let prodDB;

        const newProduct = {
            productId: (idProd),
            quantity: 1
        }

        try {
            prodDB = await productsService.getProductById(idProd)
            if (!prodDB) customError.customError('Invalid Product Id', productsErrors.getProductByIdError(idProd), errorCodes.ERROR_ARGUMENTS)

        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

        try {
            cart = await cartsService.getCartById(idCart)
            if (!cart) customError.customError('Invalid Cart Id', cartsErrors.getCartByIdError(idCart), errorCodes.ERROR_ARGUMENTS)
        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

        let indexProduct = cart.products.findIndex(prod => prod.productId._id.toString() == idProd)
        if (indexProduct == -1) {
            cart.products.push(newProduct)
        } else {
            cart.products[indexProduct].quantity++
        }

        await cartsService.updateCartById(idCart, cart)
        res.setHeader("Content-Type", "application/json")
        res.status(201).json({
            cart
        })

    }

    async sendPurchase(req, res) {
        let idCart = req.params.cid;
        let email = req.user.email;
        let cart;
        let outOfStock = [];
        let productsOrder = [];

        try {
            cart = await cartsService.getCartById(idCart)
            if (!cart) customError.customError('Invalid Cart Id', cartsErrors.getCartByIdError(idCart), errorCodes.ERROR_ARGUMENTS)
        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

        await Promise.all(cart.products.map(async (cartProduct) => {
            let dbProduct;
            try {
                dbProduct = await productsService.getProductById(cartProduct.productId);
            } catch (error) {
                logger.error(error);
            }

            if (cartProduct.quantity > dbProduct[0].stock) {
                outOfStock.push(cartProduct.productId._id);
            } else {
                dbProduct[0].stock = dbProduct[0].stock - cartProduct.quantity;
                productsOrder.push(dbProduct);
            }
        }));

        let amount = 0;

        productsOrder.forEach(async (prodDB) => {

            let prodDBId = prodDB[0]._id.toString()
            await productsService.updateProductById(prodDBId, prodDB[0])
            await cartsService.deleteProductFromCart(idCart, prodDB[0])

            amount += prodDB[0].price;
        });

        let newOrder = {
            code: uuidv4(),
            amount: amount,
            purchaser: email,
        }

        ticketsService.createTicket(newOrder)

        if (outOfStock.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                message: 'Products out of stock:',
                outOfStock
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                message: 'Order sent successfully.'
            });
        }

    }

    async updateProductFromCart(req, res) {
        let newQuantity = Number(req.body.quantity)
        let cart;
        let idCart = req.params.cid
        let idProd = req.params.pid

        try {
            cart = await cartsService.getCartById(idCart)
            if (!cart) customError.customError('Invalid Cart Id', cartsErrors.getCartByIdError(idCart), errorCodes.ERROR_ARGUMENTS)
        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

        let product = cart.products.find(prod => prod.productId._id.toString() == idProd)

        try {
            if (!product) customError.customError('Invalid Product Id', productsErrors.getProductByIdError(idProd), errorCodes.ERROR_ARGUMENTS)
            product.quantity = newQuantity;
        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

        let updatedCart = await cartsService.updateCartById(idCart, cart)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            updatedCart
        })

    }

    async deleteCart(req, res) {
        let idCart = req.params.cid;
        let cart;

        try {
            cart = await cartsService.getCartById(idCart)
            if (!cart) customError.customError('Invalid Cart Id', cartsErrors.getCartByIdError(idCart), errorCodes.ERROR_ARGUMENTS)
        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

        await cartsService.deleteCartById(idCart)

        let carts;
        try {
            carts = await cartsService.getCarts()

            if (carts) {
                res.setHeader("Content-Type", "application/json")
                res.status(200).json({
                    carts
                })
            } else {
                customError.customError('DB Error', cartsErrors.getCartsError(), errorCodes.ERROR_DB)
            }

        } catch (error) {
            logger.fatal(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

    }

    async deleteProductFromCart(req, res) {
        let idCart = req.params.cid;
        let idProd = req.params.pid;
        let cart;

        try {
            cart = await cartsService.getCartById(idCart)
            if (!cart) customError.customError('Invalid Cart Id', cartsErrors.getCartByIdError(idCart), errorCodes.ERROR_ARGUMENTS)
        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

        let productIndex = cart.products.findIndex(prod => prod.productId._id.toString() == idProd)
        try {
            if (productIndex != -1) {
                cart.products.splice(productIndex, 1)

                let carts = await cartsService.updateCartById(idCart, cart)
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    carts
                })
            } else {
                customError.customError('Invalid Product Id', productsErrors.getProductByIdError(idProd), errorCodes.ERROR_ARGUMENTS)
            }
        } catch (error) {
            logger.error(error)
            res.setHeader("Content-Type", "application/json")
            return res.status(error.code).json({ message: error.message })
        }

    }

}

export const cartsController = new CartsController()