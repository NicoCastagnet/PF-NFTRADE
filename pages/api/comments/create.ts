import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postComment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    try {
      const { nftId, userId, content } = req.body
      if (!userId || !nftId || !content)
        return res
          .status(400)
          .json({ message: 'Please provide userId, nftId, and content body' })
      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
        select: {
          id: true,
        },
      })
      const nft = await prisma.nft.findUnique({
        where: {
          id: nftId as string,
        },
        select: {
          id: true,
        },
      })
      if (!user) {
        res.status(404).json({ message: 'User id is not valid' })
      } else if (!nft) {
        res.status(404).json({ message: 'Nft id is not valid' })
      } else {
        const comment = await prisma.comment.create({
          data: {
            content: content,
            nftId: nft.id,
            userId: user.id,
          },
        })
        res.status(200).json({ message: 'Comment created', data: comment })
      }
    } catch (e) {
      res.status(400).json({ message: 'Something went wrong' })
    }
  } else {
    return res.status(400).json({ message: 'Method not allowed' })
  }
}
