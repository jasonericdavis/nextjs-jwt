import {User} from '../../interfaces'
import {createAuthToken} from '../../lib/server/token'
import { NextApiRequest, NextApiResponse } from 'next'

export default(request: NextApiRequest, response: NextApiResponse) => {
    // We only want to handle POST request on this route
    let statusCode = 401 // make the inital response unauthorized and let it be proven to be success
    if(request.method != 'POST'){
        response.status(404).end()
    }

    const {name, password} = request.body
    if(!(password == 'test')){
        response.status(statusCode).send('Sorry thats not quite right')
        return
    }

    // TODO log every authentication request with the status
    // TODO add db logic to get user
    const user:User = {
        id: 1,
        name: name,
        roles: ["Super Hero"]
    }

    

    if(user) {
        // @TODO add authentication logic
        const authenticated =  true
        if(authenticated) {
            createAuthToken(response, user)
            statusCode = 200
        }
    } 
    response.status(statusCode).end()
}