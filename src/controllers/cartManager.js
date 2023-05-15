import { cartsService, productsService } from '../services/index.js';

class CartManager {
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
        let carts = await cartsService.getCarts()
        res.setHeader("Content-Type", "application/json")
        res.status(200).json({
            carts
        })

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

    async getCartById(req, res) {
        let idCart = req.params.cid
        let cartById = await cartsService.getCartById(idCart)

        if (cartById) {
            res.setHeader("Content-Type", "application/json")
            res.status(200).json({
                cartById
            })
        } else {
            res.setHeader("Content-Type", "application/json")
            res.status(400).json({
                message: `No existe el carrito con Id '${idCart}'`
            })
        }

    }

    async addProductToCart(req, res) {
        let idCart = req.params.cid;
        let idProd = req.params.pid;
        let cart;

        const newProduct = {
            productId: (idProd),
            quantity: 1
        }

        const prodDB = await productsService.getProductById(idProd)

        if(!prodDB) return res.status(400).send(`No existe un producto con id ${idProd}.`)

        cart = await cartsService.getCartById(idCart)

        if (!cart) return res.status(400).send(`No existe un carrito con id ${idCart}.`)

        let indexProduct = cart.products.findIndex(prod => prod.productId == idProd)
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

    async updateProductFromCart(req, res) {
        let newQuantity = Number(req.body.quantity)
        let idCart = req.params.cid
        let idProd = req.params.pid

        let cart = await cartsService.getCartById(idCart)
        if (cart) {
            let product = cart.products.find(item => item.productId == idProd)
            if (product) {
                product.quantity = newQuantity;
                let updatedCart = await cartsService.updateCartById(idCart, cart)

                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    updatedCart
                })
            } else {
                res.setHeader("Content-Type", "application/json")
                res.status(400).json({
                    message: `No existe un producto con Id '${idProd}'.`
                })
            }
        } else {
            res.setHeader("Content-Type", "application/json")
            res.status(400).json({
                message: `No existe un carrito con Id '${idCart}'.`
            })
        }
    }

    async deleteCart(req, res) {
        let idCart = req.params.cid
        let cart = await cartsService.getCartById(idCart)

        if (!cart) return res.status(400).send(`No existe un carrito con id ${idCart}.`)

        await cartsService.deleteCartById(idCart)

        let carts = await cartsService.getCarts()
        res.setHeader("Content-Type", "application/json")
        res.status(200).json({
            carts
        })

    }

    async deleteProductFromCart(req, res) {
        let idCart = req.params.cid
        let idProd = req.params.pid

        let cart = await cartsService.getCartById(idCart)
        if (cart) {
            let productIndex = cart.products.findIndex(prod => prod.productId == idProd)
            if (productIndex != -1) {
                cart.products.splice(productIndex, 1)

                let carts = await cartsService.updateCartById(idCart, cart)
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    carts
                })
            } else {
                res.setHeader("Content-Type", "application/json")
                res.status(400).json({
                    message: `No existe un producto con Id '${idProd}'.`
                })
            }
        } else {
            res.setHeader("Content-Type", "application/json")
            res.status(400).json({
                message: `No existe un carrito con Id '${idCart}'.`
            })
        }
    }

}

export const cartManager = new CartManager()