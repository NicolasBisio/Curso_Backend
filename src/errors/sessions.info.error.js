class SessionsErrors {
    
    authenticationFailure=()=>{
        return `Expected an Id, instead recieved:.`
    }

    authorizationFailure=()=>{
        return `Expected a title, instead recieved:.`
    }

}

export const sessionsErrors = new SessionsErrors()