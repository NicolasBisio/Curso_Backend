import mongoose from "mongoose";
import { config } from "../config/config.js";
import { logger } from "../utils/index.js";

export class DB {
    static #conexion;
    constructor() {
        mongoose.connect(config.database.MONGOURL, { dbName: config.database.DB })
            .then(conn => logger.info('Conexión a la DB establecida.'))
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