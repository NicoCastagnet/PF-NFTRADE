// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function updateNft(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { id, nftsId } = req.body

      const collection = await prisma.collection.update({
        where: {
          id: id?.toString(),
        },
        data: {
          erased: true,
          nfts: {
            disconnect: nftsId.map((nftId: string) => ({ id: nftId })),
          },
        },
      })
      const msg = {
        text: 'The NFT was successfully updated.',
        data: collection,
      }
      res.status(205).json(msg)
    }
  } catch (e: any) {
    console.error(e.message)
  }
}
