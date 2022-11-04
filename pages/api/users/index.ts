import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

/* this endpoint is for testing purposes */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      emailVerified: true,
      image: true,
      coins: true,
    },
  })
  res.status(200).json(users)
}
