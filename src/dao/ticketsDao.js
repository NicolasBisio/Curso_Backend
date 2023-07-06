import { ticketsModel } from "./models/index.js";
import { logger } from "../utils/index.js";
import { DB } from './singleton.js'

class TicketsDao {
    constructor() {
        const conectar =()=> DB.conectar()
        conectar() 
    }

    async post(ticket) {
        try {
            return await ticketsModel.create(ticket)
        } catch (error) {
            logger.error(error)
        }
    }

}

export const ticketsDao = new TicketsDao()
