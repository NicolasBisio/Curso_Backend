import { usersModel } from "./models/users.models.js";
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
            console.log(error)
        }
    }
}

export const usersDao = new UsersDao()

