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
        this.deleteCart = this.deleteCart.bind(this);
    }

    async getCarts(req, res) {
        let carts = await daoCart.get()
        res.setHeader("Content-Type", "aplication/json")
        res.status(200).json({
            carts
        })

        // if (existsSync(this.path)) {
        //     let cartsTxt = await promises.readFile(this.path, "utf-8");
        //     let carts = JSON.parse(cartsTxt);
        //     res.setHeader("Content-Type", "aplication/json")
        //     res.status(200).json({
        //         carts
        //     })
        // } else {
        //     res.setHeader("Content-Type", "aplication/json")
        //     res.status(400).json({
        //         message: `No existe el archivo ${this.path}'`
        //     })
        //     return []
        // }
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

        res.setHeader("Content-Type", "aplication/json")
        res.status(201).json({
            carts
        })

        // if (existsSync(this.path)) {
        //     let cartsTxt = await promises.readFile(this.path, "utf-8");
        //     let carts = JSON.parse(cartsTxt);

        //     let newCart = {
        //         id: uuidv4(),
        //         products: []
        //     }
        //     carts.push(newCart)
        //     await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
        //     res.setHeader("Content-Type", "aplication/json")
        //     res.status(201).json({
        //         carts
        //     })
        // } else {
        //     console.error("Not Found 2")
        //     res.setHeader('Content-Type', 'application/json');
        //     return res.status(500).json({
        //         mensaje: `Error al obtener los carritos de la DB`
        //     })
        // }
    }

    async getCartById(req, res) {
        let id = req.params.cid
        let cartById = await daoCart.getById(id)

        if (cartById) {
            res.setHeader("Content-Type", "aplication/json")
            res.status(200).json({
                cartById
            })
        } else {
            console.error("Not Found 1")
            res.setHeader("Content-Type", "aplication/json")
            res.status(400).json({
                message: `No existe el carrito con Id '${req.params.cid}'`
            })
        }

        // if (existsSync(this.path)) {
        //     let id = req.params.cid

        //     let cartsTxt = await promises.readFile(this.path, "utf-8");
        //     let carts = JSON.parse(cartsTxt);

        //     const cartById = carts.find(element => element.id == id);
        //     if (cartById) {
        //         res.setHeader("Content-Type", "aplication/json")
        //         res.status(200).json({
        //             cartById
        //         })
        //     } else {
        //         console.error("Not Found 1")
        //         res.setHeader("Content-Type", "aplication/json")
        //         res.status(400).json({
        //             message: `No existe el carrito con Id '${req.params.cid}'`
        //         })
        //     }
        // } else {
        //     console.error("Not Found 2")
        //     res.setHeader('Content-Type', 'application/json');
        //     return res.status(500).json({
        //         mensaje: `Error al obtener los carritos de la DB`
        //     })
        // }
    }

    async addProductToCart(req, res) {
        let idCart = req.params.cid
        let idProd = req.params.pid

        console.log(idProd)

        const newProduct = {
            productId: idProd,
            quantity: 1
        }

        console.log(newProduct)

        let carrito = await daoCart.getById(idCart)
        if (!carrito) return res.send(`El carrito ${idCart} no existe.`)

        let indexProduct = carrito.products.findIndex(cart => cart.id == idProd)
        if (indexProduct == -1) {
            carrito.products.push(newProduct)
        } else {
            carrito.products[indexProduct].quantity++
        }

        console.log(carrito)

        let carts = await daoCart.updateOne(idCart, carrito)
        res.setHeader("Content-Type", "aplication/json")
        res.status(201).json({
            carts
        })


        // if (existsSync(this.path)) {
        //     let idCart = req.params.cid
        //     let idProd = req.params.pid

        //     let cartsTxt = await promises.readFile(this.path, "utf-8");
        //     let carts = JSON.parse(cartsTxt);

        //     const newProduct = {
        //         id: idProd,
        //         quantity: 1
        //     }

        //     let indexCart = await carts.findIndex(element => element.id == idCart)
        //     if (indexCart !== -1) {
        //         let indexProd = await carts[indexCart].products.findIndex(element => element.id == idProd)
        //         if (indexProd === -1) {
        //             await carts[indexCart].products.push(newProduct)
        //             await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
        //             res.setHeader("Content-Type", "aplication/json")
        //             res.status(201).json({
        //                 carts
        //             })
        //         } else {
        //             carts[indexCart].products[indexProd].quantity++
        //             await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
        //             res.setHeader("Content-Type", "aplication/json")
        //             res.status(201).json({
        //                 carts
        //             })
        //         }
        //     } else {
        //         res.setHeader("Content-Type", "aplication/json")
        //         res.status(400).json({
        //             message: `No existe el carrito con Id '${idCart}'`
        //         })
        //     }
        // } else {
        //     console.error("Not Found 2")
        //     res.setHeader('Content-Type', 'application/json');
        //     return res.status(500).json({
        //         mensaje: `Error al obtener los carritos de la DB`
        //     })
        // }
    }

    async updateProductFromCart(req, res) {
        let newQuantity = req.body.quantity
        let idCart = req.params.cid
        let idProd = req.params.pid

        let cart = await cartsDao.getById(idCart)
        if (cart) {
            let product = cart.products.find(item => item.productId == idProd)
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
                    message: `No existe un producto con Id '${idProd}'.`
                })
            }
        } else {
            res.setHeader("Content-Type", "aplication/json")
            res.status(400).json({
                message: `No existe un carrito con Id '${idCart}'.`
            })
        }
    }

    async deleteCart(req, res) {
        let id = req.params.cid
        let cart = await daoCart.getById(id)

        if (!cart) return res.status(400).send(`No existe un carrito con id ${id}.`)

        await daoCart.deleteOne(id)

        let carts = await daoCart.get()
        res.setHeader("Content-Type", "aplication/json")
        res.status(200).json({
            carts
        })


        // if (existsSync(this.path)) {
        //     let id = req.params.cid
        //     let cartsTxt = await promises.readFile(this.path, "utf-8");
        //     let carts = JSON.parse(cartsTxt);

        //     const position = carts.findIndex(element => element.id == id);

        //     if (position != -1) {
        //         let cartsFiltrados = carts.filter(element => element.id != id)
        //         console.log(`Se ha eliminado el carrito con Id '${id}'`)
        //         carts = cartsFiltrados
        //         await promises.writeFile(this.path, JSON.stringify(carts, null, 3))
        //         res.setHeader("Content-Type", "aplication/json")
        //         res.status(200).json({
        //             carts
        //         })
        //     } else {
        //         res.setHeader("Content-Type", "aplication/json")
        //         await res.status(400).json({
        //             message: `No existe el carrito con Id '${id}'.`
        //         })
        //     }
        // } else {
        //     console.error("Not Found 2")
        //     res.setHeader('Content-Type', 'application/json');
        //     return res.status(500).json({
        //         mensaje: `Error al obtener los carritos de la DB`
        //     })
        // }
    }


}  // fin class