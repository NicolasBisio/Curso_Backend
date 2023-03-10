const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const cartsCollection = 'carts'

const cartsSchema = new Schema({
    productId: {
        type: string
    },
    quantity: {
        type: number,
        required: true    
    }
})

// export const cartsModel = model(cartsCollection, cartsSchema)
