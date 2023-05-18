import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartsCollection = 'carts'

const cartsSchema = new Schema(
    {
        products: {
            type: [
                {
                    productId: {
                        type: Schema.Types.ObjectId,
                        ref: 'products'
                    },
                    quantity: {
                        type: Number
                    }
                }
            ]
        }
    }

)

cartsSchema.plugin(mongoosePaginate)

export const cartsModel = model(cartsCollection, cartsSchema);