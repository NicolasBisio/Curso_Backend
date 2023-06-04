export const errorMiddleware = (error, req, res, next) => {
    if (error) {
        console.log(error)
        res.setHeader("Content-Type", "application/json")
        return res.status(error.code).json({ message: error.message })
    }

    next();
}