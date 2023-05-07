import { existsSync, promises } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { setDao } from '../dao/factory.js';

const dao = await setDao()
const daoCart = dao.carts

export default class cartManager {
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
        let carts = await daoCart.get()
        res.setHeader("Content-Type", "application/json")
        res.status(200).json({
            carts
        })

    }

    async addCart(req, res) {

        // armas tu carrito, y si hubiese que validar algo, lo haces acá... 
        // Si la validación necesita algo de la DB (o de la persistencia), usas el daoCart.get
        // para traer los datos, y validas de este lado. 

        // console.log(uuidv4());

        let newCart = {
            // id: uuidv4(),
            products: []
        }

        console.log(newCart)

        // Luego armas carrito, y haces:
        let carts = await daoCart.post(newCart)

        res.setHeader("Content-Type", "application/json")
        res.status(201).json({
            carts
        })

    }

    async getCartById(req, res) {
        let idCart = req.params.cid
        let cartById = await daoCart.getById(idCart)

        if (cartById) {
            res.setHeader("Content-Type", "application/json")
            res.status(200).json({
                cartById
            })
        } else {
            console.error("Not Found 1")
            res.setHeader("Content-Type", "application/json")
            res.status(400).json({
                message: `No existe el carrito con Id '${idCart}'`
            })
        }

    }

    async addProductToCart(req, res) {
        let idCart = req.params.cid
        let idProd = req.params.pid

        console.log(idProd)

        const newProduct = {
            productId: Number(idProd),
            quantity: 1
        }

        console.log(newProduct)

        let cart = await daoCart.getById(idCart)
        if (!cart) return res.send(`El cart ${idCart} no existe.`)

        let indexProduct = cart.products.findIndex(prod => prod.productId == idProd)
        if (indexProduct == -1) {
            cart.products.push(newProduct)
        } else {
            cart.products[indexProduct].quantity++
        }

        console.log(cart)

        let carts = await daoCart.updateOne(idCart, cart)
        res.setHeader("Content-Type", "application/json")
        res.status(201).json({
            carts
        })

    }

    async updateProductFromCart(req, res) {
        let newQuantity = Number(req.body.quantity)
        let idCart = req.params.cid
        let idProd = req.params.pid

        let cart = await daoCart.getById(idCart)
        if (cart) {
            let product = cart.products.find(item => item.productId == idProd)
            if (product) {
                product.quantity = newQuantity;
                let updatedCart = await daoCart.updateOne(idCart, cart)

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
        let cart = await daoCart.getById(idCart)

        if (!cart) return res.status(400).send(`No existe un carrito con id ${idCart}.`)

        await daoCart.deleteOneCart(idCart)

        let carts = await daoCart.get()
        res.setHeader("Content-Type", "application/json")
        res.status(200).json({
            carts
        })

    }

    async deleteProductFromCart(req, res) {
        let idCart = req.params.cid
        let idProd = req.params.pid

        let cart = await daoCart.getById(idCart)
        if (cart) {
            let productIndex = cart.products.findIndex(prod => prod.productId == idProd)
            console.log(productIndex)
            if (productIndex != -1) {
                cart.products.splice(productIndex, 1)

                let carts = await daoCart.updateOne(idCart,cart)
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


}  // fin class