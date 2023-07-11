import { logger } from "../utils/index.js"

export const errorMiddleware = (error, req, res, next) => {
    if (error) {
        logger.error(error)
        if (error.redirectPath) {
            return res.redirect(error.redirectPath)
        }
        res.setHeader("Content-Type", "application/json")
        return res.status(error.code).send({ message: error.message })
    }
    next();
}