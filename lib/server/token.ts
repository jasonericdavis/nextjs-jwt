import {User, validateCookieResponse} from '../../interfaces'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import {NextApiRequest, NextApiResponse} from 'next'
import {IncomingMessage} from 'http'


const secretKey =  'SECRET_KEY'
const expirationInMilliSeconds = 60000
const issuer = 'NextJS-JWT-Example'


/**
 * Sign the JWT and add the user to the payload
 * @param user - user object that will be added to the jwt payload
 */
export const sign = (user:User) => {
    return jwt.sign({
        user
      }, secretKey
      , {issuer, expiresIn:expirationInMilliSeconds})    
}

/**
 * Verify the authToken. This method only verfies the signature is correct but other portions of the token can be verified as well
 * @param authToken
 * @param errCallback - callback for if there is an error verifying the authToken 
 */
export const verify = (authToken: string, errCallback: jwt.VerifyCallback | undefined) => {
    // TODO need to make sure the token hasn't expired
    // return  jwt.verify(authToken, secretKey, function(err, decoded) {
    //             if(err) {
    //                 errCallback(err);
    //                 return null
    //             }
    //             return decoded
    //     })
    return  jwt.verify(authToken, secretKey, errCallback)
}

/***
 * Get the auth token from the cookies located in the request
 */
export const getTokenFromCookies: (request: NextApiRequest | IncomingMessage ) => string = (request) => {
    return cookie.parse(request.headers.cookie || '').auth_token
}

/**
 * Get the user object from the JWT
 * @param authToken - the authToken that exists in the cookie
 */
export const getUserFromAuthToken: (jwt: string) => validateCookieResponse = (authToken) => {
    const authenticated = (authToken)? true : false
    let error:string | null = null
    let user = null
           
    try {
        if(authenticated) {
            const token:any = verify(authToken, (err) => { error = err})
            user = token.user
        } 
    } catch(err) {
        error = error
    } finally {
        return {user, error, authenticated}
    }
}

/**
 * Add the auth token to the response
 * @param response - response object that the token will be applied to
 * @param user - the user object that will be added to the auth token
 */
export const createAuthToken = (response: NextApiResponse, user:User) => {
    const accessToken = sign(user)
    response.setHeader('set-cookie', cookie.serialize('auth_token', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: expirationInMilliSeconds/1000, //This value is in seconds
        path: '/'
    })) 
}

/**
 * Revoke authorization by removing the cookie from the response
 */
export const revokeAuthToken = (res: NextApiResponse) => {
    // to revoke a cookie just set the expiration date to a time in the past
    res.setHeader('set-cookie', cookie.serialize('auth_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/',
        expires: new Date(Date.now() - 10000) 
    })) 
}