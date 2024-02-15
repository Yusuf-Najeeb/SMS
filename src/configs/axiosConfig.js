import axios from 'axios'

import GetToken from 'src/@core/utils/getToken'
import checkTokenExp from '../@core/utils/checkTokenExpiration'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_URL

axios.interceptors.request.use(
  config => {
    const accessToken = GetToken()

    if (accessToken) {
      checkTokenExp(accessToken)

      if (config.url && !config.url.includes('login') && !config.url.includes('register/staff?role')) {
        config.headers['x-access-token'] = `${accessToken}`
      }

      console.log(`${config.method?.toUpperCase()} request sent to ${config.url}`)
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // console.log('moved to errored', error)

    // if (error?.response?.statusText === 'Unauthorized') {

      if (error?.response?.statusText === 'Forbidden') {
      window.localStorage.removeItem('authToken')

      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)
