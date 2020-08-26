import { NextApiRequest, NextApiResponse } from "next";
import { getTokenFromCookies, createAuthToken, verify } from "../../lib/server/token";


// @TODO create a middleware for getting the user from the token
export default (req:NextApiRequest, res:NextApiResponse) => {
    if(req.method != 'POST') {
        res.status(404).end()
        return
    }

    try {
        const accessToken = getTokenFromCookies(req)
        if(!accessToken) {
            res.status(401).end()
            return
        }

        // @TODO: check to make sure the token hasn't expired
        let decoded = verify(accessToken, (err) => {
            console.log(err)
            res.status(401).end()
            return
        })

        if(decoded) {
            createAuthToken(res, user)
            res.status(200).end()
            return
        } 
        res.status(401).end()
    } catch(e) {
        console.log(e)
        res.status(401).end()
    }
}