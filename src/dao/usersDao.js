import { logger } from "../utils/index.js";
import { usersModel } from "./models/users.models.js";
logger
import { DB } from './singleton.js'

class UsersDao {
    constructor() {
        const conectar =()=> DB.conectar()
        conectar() 
    }

    async getUserByEmail(email) {
        try {
            return await usersModel.findOne({email})
        } catch (error) {
            logger.error(error)
        }
    }
}

export const usersDao = new UsersDao()

