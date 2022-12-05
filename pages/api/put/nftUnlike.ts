// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function unpostLike(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { userId, nftId } = req.query
      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
      })
      if (!user) {
        res.status(400).send('Failed. User ID was not found.')
      } else {
        const nft = await prisma.nft.update({
          data: {
            likedBy: {
              disconnect: { id: user.id },
            },
          },
          where: {
            id: nftId as string,
          },
        })
        const msg = {
          message: 'Passed. NFT successffully updated.',
          data: nft,
        }
        res.status(200).send(msg)
      }
    }
  } catch (e: any) {
    console.error(e.message)
  }
}
