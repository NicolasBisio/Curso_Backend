import { logger } from "../utils/index.js"

export const errorMiddleware = (error, req, res, next) => {
    if (error) {
        logger.error(error)
        res.setHeader("Content-Type", "application/json")
        return res.status(error.code).send({ message: error.message })
    }

    next();
}