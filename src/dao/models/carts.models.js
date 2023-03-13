import { Schema, model } from 'mongoose';

const cartsCollection = 'carts'

const cartsSchema = new Schema({
    productId: {
        type: String
    },
    quantity: {
        type: Number,
        required: true    
    }
})

export default model(cartsCollection, cartsSchema);
