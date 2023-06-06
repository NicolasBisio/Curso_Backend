import { cartsModel } from './models/carts.models.js';
import { logger } from '../utils/index.js';

export class CartsDBDao {
    constructor() {
    }

    async get() {
        try {
            return await cartsModel.find()
        } catch (error) {
            logger.error(error)
        }
    }

    async getById(idCart) {
        try {
            return await cartsModel.findOne({ _id: idCart }).populate('products.productId')
        } catch (error) {
            logger.error(error)
            return undefined
        }
    }

    async post(cart) {
        try {
            return await cartsModel.create(cart)
        } catch (error) {
            logger.error(error)
        }
    }

    async updateOne(idCart, cart) {
        try {
            return await cartsModel.updateOne({ _id: idCart }, cart)
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteOne(idCart) {
        try {
            return await cartsModel.deleteOne({ _id: idCart });
        } catch (error) {
            logger.error(error)
        }
    }

}