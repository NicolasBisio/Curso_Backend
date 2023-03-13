const messagesModel = require('./models/messages.models.js').default

class messageManagerDB {
    async addMessage(message, req, res) {
        let messageToCreate = message;
        await messagesModel.create(messageToCreate);

    }
}

module.exports = messageManagerDB;