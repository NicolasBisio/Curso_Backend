import productsModel from './models/products.models.js';

export default class ProductManagerDB {
    
    async getProducts(req, res) {
        let products;
        try {
            products = await productsModel.find()
        } catch (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({
                mensaje: `Error al obtener los productos de la DB`
            })
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            products
        })

    }

    async addProduct(req, res) {
        let productToCreate = req.body;

        let newProduct = await productsModel.create(productToCreate);

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({
            newProduct
        })

    }

    async updateProduct(req, res) {
        let id = req.params.pid;

        let productToUpdate = req.body;
        let newProduct = await productsModel.updateOne({ _id: id }, productToUpdate)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            newProduct
        })
    }

    async deleteProduct(req, res) {
        let id = req.params.pid;

        let productToDelete = await productsModel.deleteOne({ _id: id });

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            productToDelete
        })
    }

}