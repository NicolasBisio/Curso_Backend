import { Schema, model } from "mongoose";

const usersCollection = 'users';

const usersSchema = new Schema({
    name: String,
    last_name: String,
    email: { type: String, unique: [true, `El email debe ser único en la DB`] },
    age: Number,
    password: String,
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: String
});

export const usersModel = model(usersCollection, usersSchema);