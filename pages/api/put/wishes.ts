// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function putWish(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { nftId, userId } = req.body

      let wishList = await prisma.wishList.findUnique({
        where: {
          userId_nftId: { nftId, userId },
        },
      })

      if (wishList === null) {
        wishList = await prisma.wishList.create({
          data: {
            nft: { connect: { id: nftId } },
            user: { connect: { id: userId } },
          },
        })
      } else {
        wishList = await prisma.wishList.delete({
          where: {
            userId_nftId: { userId, nftId },
          },
        })
      }

      const msg = {
        message: 'Passed. NFT successffully updated.',
        data: wishList,
      }
      res.status(200).send(msg)
    }
  } catch (e) {
    console.error(e)
  }
}
