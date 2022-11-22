// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string
      address: string
      email: string
      image: string
      username: string
      password: string
      name: string
      admin: boolean
    } & DefaultSession['user']
  }
}
