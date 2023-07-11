class CustomError {
    customError(message, info, code, redirectPath) {
        const error = new Error(message)
        error.info = info
        error.code = code
        error.redirectPath = redirectPath
        throw error
    }
}

export const customError = new CustomError()