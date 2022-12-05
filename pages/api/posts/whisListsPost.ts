// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postWishlist(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { userId, nftId } = req.body
    if (!userId || !nftId) {
      res.status(400).send('Failed. Missing data.')
    } else {
      const list = await prisma.wishList.create({
        data: {
          userId,
          nftId,
        },
      })
      const msg = {
        text: 'The whishlist was successfully created.',
        data: list,
      }
      res.status(201).json(msg)
    }
  }
}
