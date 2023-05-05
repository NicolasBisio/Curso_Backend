import { cartsModel } from './models/carts.models.js';
import mongoose from 'mongoose';


export class CartsDBDao {
    constructor() {
    }

    async get() {
        return await cartsModel.find()
    }

    async getById(idCart) {
        return await cartsModel.findOne({ _id: idCart })
    }

    async post(cart) {
        return await cartsModel.create(cart)
    }

    async updateOne(idCart, cart) {
        return await cartsModel.updateOne({ _id: idCart }, cart)
    }

    async deleteOne(idCart) {
        return await cartsModel.deleteOne({ _id: idCart });
    }

}