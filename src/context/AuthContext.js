// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'
import { notifyError } from '../@core/components/toasts/notifyError'
import { notifySuccess } from '../@core/components/toasts/notifySuccess'

// import { storeToken } from '../../lib'

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  staffLogin: () => Promise.resolve(),
  userLogin: () => Promise.resolve(),
  applicantLogin: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        const storedUser = JSON.parse(window.localStorage.getItem(authConfig.storageUserKeyName))
        if(Object.keys(storedUser).includes("id")){
            setLoading(false)
            setUser({...storedUser})
        }else {
            router.push('/login')
            window.localStorage.removeItem(authConfig.storageUserKeyName)
            setUser(null)
            setLoading(false)
        }
      
      } else if(router.asPath.includes('applicantlogin')) {
        router.push('/applicantlogin')
        setLoading(false)
      }
      else {
        router.push('/login')
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleStaffLogin = async (values) => {

    try {
        const { data } = await axios({
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          url: `${baseUrl}/auth/login/staff`,
          data: {
            ...values
          }
        })
        if (data) {

          const returnUrl = router.query.returnUrl
    
          const userObject = JSON.stringify(data?.data?.user)
          setUser({...data?.data?.user})
          localStorage.setItem(authConfig.storageTokenKeyName, data?.data?.token)
          localStorage.setItem(authConfig.storageUserKeyName, userObject)
          notifySuccess('Login successful')

              const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/dashboard'
              router.replace(redirectURL)
        }
    
      } catch (error) {
        notifyError(error.response.data.message || 'Login failed')
      }
  }

  const handleUserLogin = async (values) => {

    try {
        const { data } = await axios({
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          url: `${baseUrl}/auth/login/user`,
          data: {
            ...values
          }
        })
        if (data) {
          const returnUrl = router.query.returnUrl
    
          const userObject = JSON.stringify(data?.data?.user)
          setUser({...data?.data?.user})
          localStorage.setItem(authConfig.storageTokenKeyName, data?.data?.token)
          localStorage.setItem(authConfig.storageUserKeyName, userObject)
          notifySuccess('Login successful')


              const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
              router.replace(redirectURL)
        }
    
      } catch (error) {
        notifyError(error.response.data.message || 'Login failed')
      }
  }

  const handleApplicantLogin = async (values) => {

    try {
        const { data } = await axios({
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          url: `${baseUrl}/auth/login?type=others`,
          data: {
            ...values
          }
        })
        if (data) {
          // const returnUrl = router.query.returnUrl
    
          const userObject = JSON.stringify(data?.data?.user)
          setUser({...data?.data?.user})
          localStorage.setItem(authConfig.storageTokenKeyName, data?.data?.token)
          localStorage.setItem(authConfig.storageUserKeyName, userObject)
          notifySuccess('Login successful')


              // const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
              router.replace('/apps/applicantCBTExam')
        }
    
      } catch (error) {
        notifyError(error.response.data.message || 'Login failed')
      }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem(authConfig.storageUserKeyName)
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    staffLogin: handleStaffLogin,
    userLogin: handleUserLogin,
    applicantLogin: handleApplicantLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
