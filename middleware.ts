import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.rewrite(new URL(req.url))
  },
  {
    callbacks: {
      authorized({ token }) {
        return token?.email !== undefined
      },
    },
  },
)

export const config = {
  matcher: ['/buy', '/nfts/create', '/dashboard', '/dashboard/webdata'],
}
