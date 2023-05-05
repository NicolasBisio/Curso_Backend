import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'products'

const productsSchema = new Schema({
    code: {
        type: String,
        unique: [true, `El código debe ser único en la DB`]            
    },
    purchase_datetime: {
        type: String,            
    },
    amount: {
        type: Number,            
    },
    purchaser: {
        type: String,            
    }
})

productsSchema.plugin(mongoosePaginate)

export const productsModel = model(productsCollection, productsSchema);