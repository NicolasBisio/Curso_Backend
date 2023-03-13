import cartsModel from './models/carts.models.js';

class cartManagerDB {

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

    async addCart(req, res) {
        let cartToCreate = req.body;

        let newCart = await cartsModel.create(cartToCreate);

        res.setHeader('Content-Type', 'application/json');
        res.status(201).json({
            newCart
        })

    }

    async updateCart(req, res) {
        let id = req.params.pid;

        let cartToUpdate = req.body;
        let newCart = await cartsModel.updateOne({ _id: id }, cartToUpdate)

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            newCart
        })
    }

    async deleteCart(req, res) {
        let id = req.params.pid;

        let cartToDelete = await productsModel.deleteOne({ _id: id });

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            cartToDelete
        })
    }

}

export default cartManagerDB;