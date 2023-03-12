const messagesModel = require('./models/messages.models.js')

class messageManagerDB {
    async addMessage(message, req, res) {
        let messageToCreate = message;
        await messagesModel.create(messageToCreate);

    }
}

module.exports = messageManagerDB;