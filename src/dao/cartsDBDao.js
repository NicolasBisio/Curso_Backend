import { cartsModel } from './models/carts.models.js';
import mongoose from 'mongoose';

export class CartsDBDao {
    constructor() {
    }

    async get() {
        try {
            return await cartsModel.find()
        } catch (error) {
            console.log(error)
        }
    }

    async getById(idCart) {
        try {
            return await cartsModel.findOne({ _id: idCart })
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    async post(cart) {
        try {
            return await cartsModel.create(cart)
        } catch (error) {
            console.log(error)
        }
    }

    async updateOne(idCart, cart) {
        try {
            return await cartsModel.updateOne({ _id: idCart }, cart)
        } catch (error) {
            console.log(error)
        }
    }

    async deleteOne(idCart) {
        try {
            return await cartsModel.deleteOne({ _id: idCart });
        } catch (error) {
            console.log(error)
        }
    }

}