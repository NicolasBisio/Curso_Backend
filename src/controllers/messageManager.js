import messagesModel from '../dao/models/messages.models.js';

class messageManager {
    async addMessage(message, req, res) {
        let messageToCreate = message;
        await messagesModel.create(messageToCreate);
    }
}

export default messageManager;