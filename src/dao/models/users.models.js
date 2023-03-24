import { Schema, model } from "mongoose";

const usersCollection = 'users';

const usersSchema = new Schema({
    name: String, 
    lastName: String,
    mail: { type: String, unique: true },
    password: String,
    age: Number
});

export const usersModel = model(usersCollection, usersSchema);