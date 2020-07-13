import { AppProps } from 'next/app'
import ProtectedRoute from '../components/ProtectedRoute'

function MyApp({ Component, pageProps }: AppProps) {

    if(pageProps.authRequired) {
        return <ProtectedRoute authenticated={pageProps.authenticated}><Component {...pageProps} /></ProtectedRoute>
    }
  return <Component {...pageProps} />
}

export default MyApp