import { customError, errorCodes, sessionsErrors } from '../errors/index.js';

export const authorization = (role) => {
    console.log('Llegó al authorization')
    return async (req, res, next) => {
        if (!req.user) return customError.customError('Authorization Error', sessionsErrors.authorizationFailure, errorCodes.ERROR_AUTHORIZATION)
        if (req.user.role != role) return customError.customError('Authentication Error', sessionsErrors.authenticationFailure, errorCodes.ERROR_AUTHENTICATION)
        next()
    }
}