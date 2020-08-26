// import {getTokenFromCookies, getUserFromAuthToken} from '../lib/server/token'
// import { GetServerSideProps } from 'next'
import {User} from '../interfaces'
import Layout from '../components/Layout'
import ProtectedPage  from '../components/ProtectedPage'
import useSWR from 'swr'


type protectedProps = {
    user: User
}

const fetcher:(url:string) => any = (url) => fetch(url).then(r => r.json())

const Protected: React.FC<protectedProps> = () => {
    const {data, error} = useSWR<{name:string}, any>('api/user', fetcher)
    
    if(error) return <div>There was an error: {error.message}</div>
    if(!data) return <div>I dont know who you are</div>
    return <Layout title="Protected Page">
                <h1>Hello {data.name} 👋</h1>
                <p> You have reached the protected page</p>
            </Layout>
}


// This function is called on each SSR
// export const getServerSideProps: GetServerSideProps = async ({req}) => {
//     // The next 2 lines gets the token (if it exists) from the cookie and checks if it is authorized
//     const token:string = getTokenFromCookies(req)
//     const {user, error, authenticated} = getUserFromAuthToken(token)
    
//     // just because the person is authenticated doesn't mean they are authorized to view the page
//     //const authorized = user.roles
    
//     return {props: {
//         user, error, authenticated, authRequired: true
//     }}
// }

export default (props:protectedProps) => <ProtectedPage><Protected {...props} /></ProtectedPage>