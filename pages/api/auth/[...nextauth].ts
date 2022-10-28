import prisma from '@lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { compare } from 'bcryptjs'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialProviders, {
  CredentialInput,
} from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import LinkedInProvider from 'next-auth/providers/linkedin'
import TwitterProvider from 'next-auth/providers/twitter'

interface cli {
  clientId: string
  clientSecret: string
}

export const authOptions: NextAuthOptions = {
  // Adatpter Prisma
  adapter: PrismaAdapter(prisma),
  // Configure authentication providers
  providers: [
    // credentials Provider
    CredentialProviders({
      name: 'Credentials',
      authorize: async (credentials) => {

        // check user existance
        const result = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!result) {
          throw new Error('No user Found with Email Please Sign Up...!')
        }

        // compare()
        const checkPassword = compare(credentials.password, result.passwordHash)

        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or Password doesn't match")
        }

        return result
      },
      credentials: undefined
    }),
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as cli),
    // Facebook Provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    } as cli),
    // LinkedIn Provider
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    } as cli),
    // Twitter Provider
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: '2.0',
    } as cli),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ token, session }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub
        console.log(session)
      }
      //
      return session
    },
  },
}
export default NextAuth(authOptions)

// const signInUser = async ({
//   user,
//   password,
// }: {
//   user: any
//   password: string
// }) => {
//   if (!user.password) {
//     throw new Error('inserting password, please')
//   }
//   const isMatch = await compare(password, user)
//   if (isMatch) {
//     throw new Error('password invalid')
//   }
//   return user
// }
