import { productsModel } from './models/products.models.js';
import { cartsModel } from './models/carts.models.js';

import ProductManagerDB from "./productManagerDB.js";
const product = new ProductManagerDB

import cartManagerDB from "../dao/cartManagerDB.js";
const cart = new cartManagerDB

export default class ViewsManagerDB {

    async getProducts(req, res) {
        let products;
        let paginaActual = 1
        let limit = 10
        let sort = 1

        paginaActual = req.query.pagina ? req.query.pagina : paginaActual;
        limit = req.query.limit ? req.query.limit : limit;

        if (req.query.sort == "asc") {
            sort = 1
        } if (req.query.sort == "desc") {
            sort = -1
        }

        try {
            products = await productsModel.paginate({}, { page: paginaActual, limit: limit, sort: { price: sort } })
            console.log(products)

        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({
                mensaje: `Error al obtener los productos de la DB`
            })
        }

        let { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products

        res.setHeader('Content-Type', 'text/html');
        res.status(200).render('products', {
            products: products.docs,
            totalPages, hasPrevPage, hasNextPage, prevPage, nextPage
        })

    }

    async getChat(req, res) {
        res.status(200).render('chat')
    }

    async getProductsRealTime(req, res) {
        let products = await product.getProducts();
        res.status(200).render('realTimeProducts', {
            products
        })
    }

    async getCartById(req, res) {
        let id = req.params.cid;
        let cartById = await cartsModel.find({ _id: id }).populate('products.productId')
        console.log({ cartById })

        if (cartById) {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).render('carts', {
                id, cartById
            })
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                mensaje: `El carrito con el id ${id} no fue encontrado.`
            })
        }
    }

}
