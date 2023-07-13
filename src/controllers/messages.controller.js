import { messagesModel } from '../dao/models/index.js';

class MessagesController {
    async addMessage(message, req, res) {
        let messageToCreate = message;
        await messagesModel.create(messageToCreate);
    }

    
}

export const messagesController = new MessagesController()