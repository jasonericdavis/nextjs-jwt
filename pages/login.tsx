import React, {useState} from 'react'
import { useRouter } from 'next/router'

type loginProps = {
    name:string
    password:string
}


const authenticate = async ({name, password}:loginProps) => {
    let authenticated = false
    let message = null
    try {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, password})
        }

        const response = await fetch('/api/login', requestOptions)
        if(response.status === 200) {
            authenticated = true
        } else {
            message = await response.text().then(data => {
                return data
            })
        }
    } catch(e) {
        console.log(e)
    }
    return {authenticated, message}
}

const Login = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const router = useRouter()

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {authenticated, message} = await authenticate({name, password})
        if (authenticated) {
            router.push('/')
        } else {
            if(message) setMessage(message)
        }

    }


    return (
        <>
      <h1>Sign In</h1>
      {message}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          autoComplete="email"
          value={name}
          required
          onChange={e => setName(e.target.value)}

        />
        <input
          name="password"
          type="password"
          autoComplete="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign in</button> or{' '}
      </form>
    </>
    )
}

export default Login