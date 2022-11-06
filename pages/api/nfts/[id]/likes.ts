import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { LikesResponse } from 'types/api-responses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikesResponse | null>,
) {
  const { id } = req.query
  try {
    const likes = await prisma.nft.findUniqueOrThrow({
      where: { id: id as string },
      select: {
        likedBy: { select: { id: true } },
        _count: {
          select: {
            likedBy: true,
          },
        },
      },
    })
    return res.json(likes)
  } catch (e) {
    return res.status(404).json(null)
  }
}
