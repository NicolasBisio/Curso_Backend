import { productsModel } from './models/products.models.js';

export default class ProductsDBDao {

    async get() {
        return await productsModel.find()
    }

    async getById(idProd) {
        return await productsModel.find({ _id: idProd })
    }

    async post(product) {
        return await productsModel.create(product)
    }

    async postMany(products){
        return await productsModel.insertMany(products)
    }
        
    async updateOne(idProd, product) {
        return await productsModel.updateOne({ _id: idProd }, product)
    }

    async deleteOne(idProd) {
        return await productsModel.deleteOne({ _id: idProd });
    }

}