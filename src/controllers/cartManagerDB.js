import { cartsDao } from '../app.js';
import { cartsModel } from '../dao/models/carts.models.js';

export default class cartManagerDB {

    async getCarts(req, res) {
        let carts;
        try {
            carts = await cartsDao.get()
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({
                mensaje: `Error al obtener los carritos de la DB`
            })
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            carts
        })

    }

    async getCartById(req, res) {
        let idCart = req.params.cid;
        let cartById = await cartsModel.find({ _id: idCart }).populate('products.productId') // probar, y probar con findById y con findOne
        
        if (cartById) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                cartById
            })
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                mensaje: `El carrito con el id ${idCart} no fue encontrado.`
            })
        }
    }

    async addCart(req, res) {
        let cartToCreate = {
            products: []
        }

        let newCart = await cartsDao.post(cartToCreate);

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({
            newCart
        })

    }

    async addProductToCart(req, res) {
        let idCart = req.params.cid
        let idProd = req.params.pid

        let cart = await cartsDao.getById(idCart)

        if (cart) {
            let indexProd = cart.products.findIndex((item) => item.productId == idProd)
            if (indexProd !== -1) {
                cart.products[indexProd].quantity++;

                let resultado = await cartsDao.updateOne(idCart, cart);
                
                let updatedCart = await cartsDao.getById(idCart)
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    updatedCart
                })
            } else {
                cart.products.push({
                    productId: idProd,
                    quantity: 1
                })
                await cartsDao.updateOne(idCart, cart);
                let newCart = await cartsDao.getById(idCart)
                res.setHeader('Content-Type', 'application/json');
                res.status(201).json({
                    newCart
                })
            }
        } else {
            res.setHeader("Content-Type", "aplication/json")
            res.status(400).json({
                message: `No existe el carrito con Id '${idCart}'`
            })
        }
    }

    async updateCart(req, res) {
        let idCart = req.params.cid;
        let cartToUpdate = req.body;

        // agregar validaciones??

        try {
            let updatedCart = await cartsDao.updateOne(idCart, cart);
            console.log(updatedCart)
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                mensaje: `El carrito con el id ${idCart} no fue encontrado.`
            })
        }

        let updatedCart = await cartsDao.getById(idCart)
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            updatedCart
        })

    }

    async updateProductFromCart(req, res) {
        let newQuantity = req.body.quantity
        let idCart = req.params.cid
        let idProd = req.params.pid

        let cart = await cartsDao.getById(idCart)
        if (cart) {
            let product = cart.products.find((item) => item.productId == idProd)
            if (product) {
                product.quantity = newQuantity;
                await cartsModel.updateOne({ _id: idCart }, { $set: { products: cart.products } });

                let updatedCart = await cartsDao.getById(idCart)
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    updatedCart
                })
            } else {
                res.setHeader("Content-Type", "aplication/json")
                res.status(400).json({
                    message: `No existe un producto con Id '${idProd}'`
                })
            }
        } else {
            res.setHeader("Content-Type", "aplication/json")
            res.status(400).json({
                message: `No existe el carrito con Id '${idCart}'`
            })
        }
    }

    async deleteCart(req, res) {
        let idCart = req.params.cid;
        let cartToDelete;

        try {
            cartToDelete = await cartsDao.deleteOne(idCart);
            console.dir('Carrito eliminado: ' + cartToDelete)
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                mensaje: `El carrito con el id ${idCart} no fue encontrado.`
            })
        }

        let carts = await cartsDao.get()
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            carts
        })

    }

    async deleteProductInCart(req, res) {
        let idCart = req.params.cid
        let idProd = req.params.pid

        let cart = await cartsDao.getById(idCart)
        if (cart) {
            let indexProd = cart.products.findIndex((item) => item.productId == idProd)
            if (indexProd !== -1) {
                await cartsModel.deleteOne({ "products.productId": idProd });
                let updatedCart = await cartsDao.getById(idCart)
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    updatedCart
                })
            } else {
                res.setHeader("Content-Type", "aplication/json")
                res.status(400).json({
                    message: `No existe un producto con Id '${idProd}'`
                })
            }
        } else {
            res.setHeader("Content-Type", "aplication/json")
            res.status(400).json({
                message: `No existe un carrito con Id '${idCart}'`
            })
        }
    }

}