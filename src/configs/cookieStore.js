// "use server"

// import axios from "axios"
// import { cookies } from "next/headers"
// import { notifySuccess } from "../@core/components/toasts/notifySuccess"
// import { notifyError } from "../@core/components/toasts/notifyError"


// export  const storeToken = async (data, userObject)=> {
//     cookies().set({
//         name: "authToken",
//         value: data.token,
//         httpOnly: true,
//         sameSite: "strict",
//         secure: true,
//     })

//     cookies().set({
//         name: "authUser",
//         value: userObject,
//         httpOnly: true,
//         sameSite: "strict",
//         secure: true,
//     })
// }


// export async function logout() {
//   // Destroy the session
//   cookies().set("authToken", "");
//   cookies().set("authUser", "");
// }

// export async function getSession() {
//   const session = cookies().get("authUser")?.value;
//   if (!session) return null;

//   return JSON.parse(session);
// }

// export const handleStaffLogin = async (values) => {

//     try {
//         const { data } = await axios({
//           method: 'post',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json;charset=UTF-8'
//           },
//           url: `${baseUrl}/auth/login/staff`,
//           data: {
//             ...values
//           }
//         })
//         if (data) {

            
//             const userObject = JSON.stringify(data?.data?.user)
            
//             localStorage.setItem(authToken, data?.data?.token)
//             localStorage.setItem(authUser, userObject)
//             notifySuccess('Login successful')
            
//             await storeToken(data?.data, userObject);
            
//             return data
            
            
//         }
    
//       } catch (error) {
//         notifyError(error.response.data.message || 'Login failed')
//       }
//   }

//  export const handleUserLogin = async (values) => {

//     try {
//         const { data } = await axios({
//           method: 'post',
//           headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json;charset=UTF-8'
//           },
//           url: `${baseUrl}/auth/login/user`,
//           data: {
//             ...values
//           }
//         })
//         if (data) {
            
//             const userObject = JSON.stringify(data?.data?.user)
            
//             localStorage.setItem(authToken, data?.data?.token)
//             localStorage.setItem(authUser, userObject)
//             notifySuccess('Login successful')
            
//             await storeToken(data?.data, userObject);
            
          
//         }
    
//       } catch (error) {
//         notifyError(error.response.data.message || 'Login failed')
//       }
//   }