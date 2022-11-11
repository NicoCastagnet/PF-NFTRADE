import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postLike(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { nftId, published, nftsId } = req.body

      if (nftId) {
        const nft = await prisma.nft.update({
          data: {
            published: published,
          },
          where: {
            id: nftId as string,
          },
        })
        const msg = {
          message: 'nft actualizado',
          data: nft,
        }
        console.log(nft)
        res.status(200).send(msg)
      }

      if (nftsId) {
        const nfts = await prisma.nft.updateMany({
          data: {
            published: published,
          },
          where: {
            id: { in: nftsId as string },
          },
        })
        console.log(nfts)
        const msg = {
          message: 'nfts actualizados',
          data: nfts,
        }
        res.status(200).send(msg)
      }
    }
  } catch (e) {
    console.log(e)
  }
}
