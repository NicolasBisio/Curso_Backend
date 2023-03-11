const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

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

module.exports = model(cartsCollection, cartsSchema);
