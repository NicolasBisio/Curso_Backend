class CustomError {
    customError(message, info, code) {
        const error = new Error(message)
        error.info = info
        error.code = code

        throw error
    }
}

export const customError = new CustomError()