import { useState, useEffect } from "react"
import { useRouter } from "next/router"


const ProtectedRoute: React.FC<{authenticated: boolean}> = ({authenticated, children}) => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if(!authenticated) {
            router.push('/login')
            return
        }
        setLoading(false)
    })

    if(loading) return <div>Loading</div>
    return <>{children}</>
}

export default ProtectedRoute