import { cartsModel } from './models/carts.models.js';

export default class cartManagerDB {

    async getCarts(req, res) {
        let carts;
        try {
            carts = await cartsModel.find()
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
        let id = req.params.cid;
        let cartById = await cartsModel.find({ _id: id }).populate('products.productId')
        // console.log(JSON.stringify(cartById, null, 3))
        console.log({ cartById })

        if (cartById) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({
                cartById
            })
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                mensaje: `El carrito con el id ${id} no fue encontrado.`
            })
        }
    }

    async addCart(req, res) {
        let cartToCreate = {
            products: [
                {
                    productId: req.body.productId,
                    quantity: req.body.quantity
                },
            ]
        }

        console.log(cartToCreate)

        await cartsModel.deleteMany({})
        let newCart = await cartsModel.create(cartToCreate);
        console.log(newCart)

        let carts = await cartsModel.find()
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({
            carts
        })

    }

    async addProductToCart(req, res) {
        let idCart = req.params.cid
        let idProd = req.params.pid

        let cart = await cartsModel.findById(idCart)
        if (cart) {
            let indexProd = cart.products.findIndex((item) => item.productId == idProd)
            if (indexProd !== -1) {
                await cartsModel.updateOne({ _id: idCart, "products.productId": idProd }, { $inc: { "products.$.quantity": 1 } });
                let carts = await cartsModel.find()
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    carts
                })
            } else {
                await cartsModel.updateOne({ _id: idCart }, { $push: { products: { productId: idProd, quantity: 1 } } });
                let carts = await cartsModel.find()
                res.setHeader('Content-Type', 'application/json');
                res.status(201).json({
                    carts
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
        let id = req.params.cid;
        let cartToUpdate = req.body;
        try {
            let newCart = await cartsModel.updateOne({ _id: id }, cartToUpdate)
            console.log(newCart)
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                mensaje: `El carrito con el id ${id} no fue encontrado.`
            })
        }

        let carts = await cartsModel.find()
        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({
            carts
        })

    }

    async updateProductFromCart(req, res) {
        let newQuantity = req.body.quantity
        let idCart = req.params.cid
        let idProd = req.params.pid

        let cart = await cartsModel.findById(idCart)
        if (cart) {
            let product = cart.products.find((item) => item.productId == idProd)
            if (product) {
                product.quantity = newQuantity;
                await cartsModel.updateOne({ _id: idCart }, { $set: { products: cart.products } });

                let carts = await cartsModel.find()
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    carts
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
        let id = req.params.cid;
        let cartToDelete;

        try {
            cartToDelete = await cartsModel.deleteOne({ _id: id });
            console.dir('Carrito eliminado: ' + cartToDelete)
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                mensaje: `El carrito con el id ${id} no fue encontrado.`
            })
        }

        let carts = await cartsModel.find()
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            carts
        })

    }

    async deleteProductInCart(req, res) {
        let idCart = req.params.cid
        let idProd = req.params.pid

        let cart = await cartsModel.findById(idCart)
        if (cart) {
            let indexProd = cart.products.findIndex((item) => item.productId == idProd)
            if (indexProd !== -1) {
                await cartsModel.deleteOne({ "products.productId": idProd });
                let carts = await cartsModel.find()
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json({
                    carts
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