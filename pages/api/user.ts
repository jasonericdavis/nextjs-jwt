import { NextApiRequest, NextApiResponse } from "next";
import { getTokenFromCookies, getUserFromAuthToken } from "../../lib/server/token";


// @TODO create a middleware for getting the user from the token
export default (req:NextApiRequest, res:NextApiResponse) => {
    // if(req.method != 'POST') {
    //     res.status(404).end()
    //     return
    // }

    try {
        const accessToken = getTokenFromCookies(req)
        if(!accessToken) {
            res.status(401).end()
            return
        }

        // // @TODO: check to make sure the token hasn't expired
        // let {user} = verify(accessToken, (err) => {
        //     console.log(err)
        //     res.status(401).end()
        //     return
        // })

        const {user, authenticated, error} = getUserFromAuthToken(accessToken)
        
        if(error) {
            res.statusCode = 500
            console.error(error)
            return
        }

        if(!authenticated) {
            res.statusCode = 401
            return
        }

        if(user) {
            console.log(user)
            res.json({user})
            res.status(200)
            return
        } 
        res.status(401).end()
    } catch(e) {
        console.log(e)
        res.status(401).end()
    }
}