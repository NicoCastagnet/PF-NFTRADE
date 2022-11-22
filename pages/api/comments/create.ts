// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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
        return res.status(400).json({
          message:
            'Missing data. Please, provide a user id, NFT id, and comment content.',
        })
      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
        select: {
          id: true,
          name: true,
        },
      })
      const nft = await prisma.nft.findUnique({
        where: {
          id: nftId as string,
        },
        select: {
          id: true,
          name: true,
          owner: true,
        },
      })
      if (!user) {
        res.status(404).json({ message: 'Failed. User id is not valid.' })
      } else if (!nft) {
        res.status(404).json({ message: 'Failed. NFT id is not valid.' })
      } else {
        const comment = await prisma.comment.create({
          data: {
            content: content,
            nftId: nft.id,
            userId: user.id,
          },
        })
        await prisma.notify.create({
          data: {
            typeNotify: 'comment',
            userId: nft.owner.id,
            nameUser: nft.owner.name,
            nftId: nft.id,
            nameNft: nft.name,
            userIdComment: user.id.toString(),
            nameUserComment: user.name,
            comment: content,
          },
        })

        res
          .status(200)
          .json({ message: 'Passed. Comment created:', data: comment })
      }
    } catch (e) {
      res.status(400).json({
        message: 'Failed: Something went wrong while posting the comment.',
      })
    }
  } else {
    return res.status(400).json({ message: 'Failed. Method not allowed.' })
  }
}
