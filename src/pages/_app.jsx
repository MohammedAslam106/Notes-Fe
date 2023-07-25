
import '../app/globals.scss'
import App from "next/app"
import { AuthProvider, useAuth } from '@/context/authContext'
import ProtectRoutes from "@/components/ProtectedRoute"
import Loading from '@/components/Loading'
import Loader from 'react-loaders'
const MyApp = ({Component, pageProps}) => {
  return (
    <AuthProvider>
      <ProtectRoutes>
          <Component {...pageProps} />
      </ProtectRoutes>
    </AuthProvider>
  )
}




MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)
  // const auth = await getUser(appContext.ctx)
  return { ...appProps }
}
export default MyApp