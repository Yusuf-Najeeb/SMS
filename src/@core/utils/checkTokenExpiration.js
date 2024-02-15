import * as jwtDecode from 'jwt-decode'


const checkTokenExp = (token) => {
    
        try {
            const decodedToken = jwtDecode.jwtDecode(token)
        
            if (decodedToken.exp * 1000 < Date.now() && typeof window !== 'undefined') {
        
            //   if (typeof window !== 'undefined') {
                window.localStorage.removeItem('authToken')
        
                window.location.href = '/login'

            //   }
            } else {
              console.log('Token has time', decodedToken.exp * 1000, '&', Date.now())
            }
          } catch (error) {
            console.log(error, 'authorization error')
            window.localStorage.removeItem('authToken')
        
            window.location.href = '/login'
          }
 
}

export default checkTokenExp
