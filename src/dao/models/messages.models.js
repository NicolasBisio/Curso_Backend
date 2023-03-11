const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const messagesCollection = 'messages'

const messagesSchema = new Schema({
    user:{
        type: String
    },
    message: {
        type: String
    }
})

module.exports = model(messagesCollection, messagesSchema);