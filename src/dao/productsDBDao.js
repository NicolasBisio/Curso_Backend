import { productsModel } from './models/products.models.js';
import { logger } from '../utils/index.js';

export class ProductsDBDao {
    constructor() {
    }

    async get() {
        try {
            return await productsModel.find()
        } catch (error) {
            logger.error(error)
        }
    }

    async getById(idProd) {
        try {
            return await productsModel.find({ _id: idProd })
        } catch (error) {
            logger.error(error)
            return undefined
        }
    }

    async post(product) {
        try {
            return await productsModel.create(product)
        } catch (error) {
            logger.error(error)
        }
    }

    async postMany(products) {
        try {
            return await productsModel.insertMany(products)
        } catch (error) {
            logger.error(error)
        }
    }

    async updateById(idProd, product) {
        try {
            return await productsModel.updateOne({ _id: idProd }, product)
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteById(idProd) {
        try {
            return await productsModel.deleteOne({ _id: idProd });
        } catch (error) {
            logger.error(error)
        }
    }

}