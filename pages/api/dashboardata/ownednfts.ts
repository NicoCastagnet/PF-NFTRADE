import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user } = req.query

  try {
    const data = await prisma.nft.findMany({
      select: {
        id: true,
        ownerId: true,
        likedBy: true,
        viewedBy: true,
      },
    })

    const userData = data.filter((e) => e.ownerId === user)

    res.json({ userData })
  } catch (error) {
    console.error(error)
  }
}
