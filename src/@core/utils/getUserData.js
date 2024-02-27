const GetUserData = () => {
    // const token = window.localStorage.getItem('access-token')
    let userData = null
  
    if (typeof window !== 'undefined') {
      userData = JSON.parse(localStorage.getItem('authUser'))
    }
  
    return userData
  }
  
  export default GetUserData
  