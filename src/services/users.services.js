import { usersDao } from "../dao/usersDao.js"
import {UsersDto} from "../dto/users.dto.js"

class UsersService {
    constructor() {
    }

    async getUserByEmail(email) {
        let user = await usersDao.getUserByEmail(email)
        let userDto = new UsersDto(user)
        return userDto
    }
    
}

export const usersService = new UsersService()