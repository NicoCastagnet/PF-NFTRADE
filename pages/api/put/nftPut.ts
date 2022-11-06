import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function updateNft(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { id } = req.query
      const { ownerId, name, image, description, price, published } = req.body
      const nfts = await prisma.nft.update({
        where: {
          id: id?.toString(),
        },
        data: {
          ownerId: ownerId,
          name: name,
          image: image,
          description: description,
          price: price,
          published: published,
        },
      })
      const msg = {
        text: 'The NFT was successfully updated.',
        data: nfts,
      }
      res.status(205).json(msg)
    }
  } catch (e: any) {
    console.log(e.message)
  }
}
