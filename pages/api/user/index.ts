// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

/* this endpoint is for testing purposes */
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      passwordHash: true,
      coins: true,
    },
  })

  res.status(200).json(users)
}
