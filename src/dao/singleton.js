import mongoose from "mongoose";
import { config } from "../config/config.js";

export class DB {
    static #conexion;
    constructor() {
        mongoose.connect(config.database.MONGOURL, { dbName: config.database.DB })
            .then(conn => console.log('Conexión a la DB establecida.'))
    }

    static conectar() {
        if (DB.#conexion) {
            return DB.#conexion
        } else {
            DB.#conexion = new DB()
            return DB.#conexion
        }
    }
}