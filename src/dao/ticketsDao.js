import { ticketsModel } from "./models/tickets.models.js";
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
            console.log(error)
        }
    }

}

export const ticketsDao = new TicketsDao()
