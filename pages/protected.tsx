import {getTokenFromCookies, getUserFromAuthToken} from '../lib/token'
import { GetServerSideProps } from 'next'
import {User} from '../interfaces'
import Layout from '../components/Layout'



const ProtectedPage: React.FC<{user:User}> = ({user}) => {
    return (
    <Layout title="Protected Page">
        <h1>Hello {user.name} 👋</h1>
        <p> You have reached the protected page</p>
      </Layout>
    )
}


// This function is called on each SSR
export const getServerSideProps: GetServerSideProps = async ({req}) => {
    // The next 2 lines gets the token (if it exists) from the cookie and checks if it is authorized
    const token:string = getTokenFromCookies(req)
    const {user, error, authenticated} = getUserFromAuthToken(token)
    
    // just because the person is authenticated doesn't mean they are authorized to view the page
    //const authorized = user.roles
    
    return {props: {
        user, error, authenticated, authRequired: true
    }}
}

export default ProtectedPage