import { customError, errorCodes, sessionsErrors } from '../errors/index.js';

export const auth = (roles, redirectPath) => {
    return async (req, res, next) => {
        try {
            if (roles.includes('public')) return next()
            if (!req.user) return customError.customError(
                'Authorization Error',
                sessionsErrors.authorizationFailure,
                errorCodes.ERROR_AUTHORIZATION,
                redirectPath
            )
            if (!roles.includes(req.user.role)) return customError.customError(
                'Authentication Error',
                sessionsErrors.authenticationFailure,
                errorCodes.ERROR_AUTHENTICATION
            )
            next()
        } catch (error) {
            next(error)
        }
    }
}