import { Schema, model } from 'mongoose';

const messagesCollection = 'messages'

const messagesSchema = new Schema(
    {
        user: {
            type: String
        },
        message: {
            type: String
        }
    },
    {
        timestamps: {
            createdAt: "sent",
        },
    }
)

export const messagesModel = model(messagesCollection, messagesSchema);