import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialProvider from "next-auth/providers/credentials"
import connectDB from "./app/lib/connnectDB"
import { getUser, googlePostUser, postUser } from "./actions"
import { compareSync, hash } from "bcryptjs"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: 'Enter your email'
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: 'Enter your password'
        },
      },
      // authorize: async({email, password, confirmPassword}) => { 
      authorize: async (credentials:any) => {
        const { email } = credentials
        const user: any = await getUser(email as string)
        if (user) {
          return {
            name: user.name,
            email: user.email,
            id: user._id
          }
        }
        else {
          throw new CredentialsSignin({ cause: 'Invalid credentials' })
        }
      }
    })
  ],

  callbacks: {
    signIn: async ({ user, account }:any) => {

      if (account?.provider === 'google') {
        try {
          const { email, name, image, id } = user
          await connectDB()
          const userAlreadyExists = await getUser(email as string)
          if (!userAlreadyExists) {
            await googlePostUser(name as string, email as string, image as string, id as string)
          }
          return true
        } catch (error) {
          throw new AuthError({ cause: 'Error creating user' })
        }
      }
      return true
    }

  },
  pages: { signIn: '/login' }
})
