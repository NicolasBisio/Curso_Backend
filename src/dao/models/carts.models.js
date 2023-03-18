import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartsCollection = 'carts'

const cartsSchema = new Schema(
    {
        products: {
            type: Array,
            items: {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number
                    //required: true
                }
            }
        }
    }

)

cartsSchema.plugin(mongoosePaginate)

export default model(cartsCollection, cartsSchema);
