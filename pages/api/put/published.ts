import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postLike(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { nftId, published } = req.body

      const nft = await prisma.nft.update({
        data: {
          published: published,
        },
        where: {
          id: nftId as string,
        },
      })

      console.log(nft)

      const msg = {
        message: 'nft actualizado',
        data: nft,
      }
      res.status(200).send(msg)
    }
  } catch (e) {
    console.log(e)
  }
}
