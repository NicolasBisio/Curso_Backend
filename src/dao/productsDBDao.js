import { productsModel } from './models/products.models.js';

export class ProductsDBDao {
    constructor() {
    }

    async get() {
        try {
            return await productsModel.find()
        } catch (error) {
            console.log(error)
        }
    }

    async getById(idProd) {
        try {
            return await productsModel.find({ _id: idProd })
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    async post(product) {
        try {
            return await productsModel.create(product)
        } catch (error) {
            console.log(error)
        }
    }

    async postMany(products) {
        try {
            return await productsModel.insertMany(products)
        } catch (error) {
            console.log(error)
        }
    }

    async updateById(idProd, product) {
        try {
            return await productsModel.updateOne({ _id: idProd }, product)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteById(idProd) {
        try {
            return await productsModel.deleteOne({ _id: idProd });
        } catch (error) {
            console.log(error)
        }
    }

}