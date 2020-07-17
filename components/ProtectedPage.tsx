import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import {refresh} from "../lib/client/token"


const ProtectedRoute: React.FC = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false)
    const router = useRouter()
    const loginUrl = `/login?redirectTo=${router.pathname}`

    useEffect(() => {
        if(!authenticated) {
            checkToken()
        }
        // setAuthenticated(true)
        // setLoading(false)
    })

    function checkToken() {
        refresh().then(response => {
            console.log(`Token Response: ${response}`)
            if(!response) {
                router.push(loginUrl)
                return
            }

            setAuthenticated(true)
        })

    }

    return !authenticated ? <>Authenticating</> : <>{children}</>
}

export default ProtectedRoute