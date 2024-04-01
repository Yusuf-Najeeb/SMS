import axios from "axios";

// import { CredentialsProvider } from "next-auth/providers"

import CredentialsProvider from "next-auth/providers/credentials"

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const options = {
    providers: [
        CredentialsProvider({
            id: 'stafflogin',
            name: 'credentials',
            credentials: {
              userId: {label: ' User Id or Email', type: 'text',},
              password: {label: 'Password', type: 'password',},
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied

                const { data } = await axios({
                    method: 'post',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json;charset=UTF-8'
                    },
                    url: `${baseUrl}/auth/login/staff`,
                    data: {
                      ...credentials
                    }
                  })

                  if(data){

                      return data.data
                  }
                  else {
                    return null
                  }


               
              },
          }),
    ],

    callbacks: {

        // The user argument in the signIn callback is the object returned by the authorize function, i.e. the response from my external API endpoint.
        async signIn({ user, account }) {
            account.access_token = user.token

            return true
          },
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
              token.accessToken = account.token
              token.id = profile.id
            }

            return token
          },

        async session({ session, token, user }) {
          // Send properties to the client, like an access_token and user id from a provider.
          session.accessToken = token.accessToken
          session.user.id = token.id
          
          return session
        }
      },
    pages: {
        signIn: '/login'
    }
} 