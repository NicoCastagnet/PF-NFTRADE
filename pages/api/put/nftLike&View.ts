import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function updateNft(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'GET') {
      const { id } = req.query
      const {} = req.body
      const nfts = await prisma.nft.update({
        where: {
          id: id?.toString(),
        },
        data: {
          viewedBy: {},
          likedBy: {},
        },
      })
      const msg = {
        text: 'Nft actualizad correctamente!',
        data: nfts,
      }
      res.status(205).json(msg)
    }
  } catch (e: any) {
    console.log(e.message)
  }
}
