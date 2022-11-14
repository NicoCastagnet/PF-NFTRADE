import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.rewrite(new URL('/buy', req.url))
  },
  {
    callbacks: {
      authorized({ token }) {
        return token !== null
      },
    },
  },
)

export const config = { matcher: ['/buy'] }
