const GetToken = () => {
  // const token = window.localStorage.getItem('access-token')
  let token = null

  if (typeof window !== 'undefined') {
    token = localStorage.getItem('authToken')
  }

  return token
}

export default GetToken
