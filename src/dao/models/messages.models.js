import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const messagesCollection = 'messages'

const messagesSchema = new Schema({
    user:{
        type: String
    },
    message: {
        type: String
    }
})

messagesSchema.plugin(mongoosePaginate)

export default model(messagesCollection, messagesSchema);