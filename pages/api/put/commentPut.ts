// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postComment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { nftId, userId, content } = req.body
    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    })
    const nft = await prisma.nft.findUnique({
      where: {
        id: nftId as string,
      },
    })
    if (!user) {
      res.status(404).send('Failed. User ID was not found.')
    } else if (!nft) {
      res.status(404).send('Failed. NFT ID was not found.')
    } else {
      await prisma.comment.create({
        data: {
          content: content,
          nft: {
            connect: { id: nftId },
          },
          user: {
            connect: { id: userId },
          },
        },
      })
      res.status(200).send('Passed. Comment successffully posted.')
    }
  } catch (e: any) {
    console.error(e.message)
  }
}
