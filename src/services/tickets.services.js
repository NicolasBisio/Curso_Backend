import { ticketsDao } from "../dao/ticketsDao.js"

class TicketsService {
    constructor() {
    }

    async createTicket(ticket) {
        return await ticketsDao.post(ticket)
    }
    
}

export const ticketsService = new TicketsService()