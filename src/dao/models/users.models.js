import { Schema, model } from "mongoose";

const usersCollection = 'users';

const usersSchema = new Schema({
    name: String, 
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    age: Number,
    rol: String
});

export const usersModel = model(usersCollection, usersSchema);