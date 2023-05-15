import messagesModel from '../dao/models/messages.models.js';

class MessageManager {
    async addMessage(message, req, res) {
        let messageToCreate = message;
        await messagesModel.create(messageToCreate);
    }
}

export const messageManager = new MessageManager()