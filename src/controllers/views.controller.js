import { productsModel, cartsModel } from '../dao/models/index.js';
import { productsService } from '../services/index.js';

class ViewsController {

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

        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({
                mensaje: `Error al obtener los productos de la DB.`
            })
        }

        let { totalPages, hasPrevPage, hasNextPage, prevPage, nextPage } = products

        res.setHeader('Content-Type', 'text/html');
        res.status(200).render('products', {
            products: products.docs,
            totalPages, hasPrevPage, hasNextPage, prevPage, nextPage,
        })

    }

    async getChat(req, res) {
        res.status(200).render('chat')
    }

    async getProductsRealTime(req, res) {
        let products = await productsService.getProducts()
        res.status(200).render('realTimeProducts', {
            products
        })
    }

    async getCartById(req, res) {
        let idCart = req.params.cid;
        let cartById = await cartsModel.find({ _id: idCart }).populate('products.productId')

        if (cartById) {
            res.setHeader('Content-Type', 'text/html');
            res.status(200).render('carts', {
                idCart, cartById
            })
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({
                mensaje: `El carrito con el id ${id} no fue encontrado.`
            })
        }
    }

    getHome(req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).render('home', {
            fullName: req.session.user.name + ' ' + req.session.user.last_name,
            role: req.session.user.role
        })
    }

    signUp(req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).render('signUp')
    }

    login(req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).render('login')
    }

    loginCurrent(req, res) {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).render('loginCurrent')
    }

}

export const viewsController = new ViewsController()