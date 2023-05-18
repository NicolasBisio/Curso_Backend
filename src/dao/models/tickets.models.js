import { Schema, model } from 'mongoose';

const ticketsCollection = 'tickets'

const ticketsSchema = new Schema(
    {
      code: {
        type: String,
        unique: true,
      },
      amount: Number,
      purchaser: String
    },
    {
      timestamps: {
        createdAt: "purchase_datetime",
      },
    }
  );

export const ticketsModel = model(ticketsCollection, ticketsSchema);