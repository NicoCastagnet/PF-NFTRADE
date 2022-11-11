import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function putPrice(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { nftId, price } = req.body

      const nft = await prisma.nft.update({
        data: {
          price: price,
        },
        where: {
          id: nftId as string,
        },
      })

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
