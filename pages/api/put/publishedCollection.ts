import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postLike(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { collectionId, published } = req.body

      const collection = await prisma.collection.update({
        data: {
          published: published,
        },
        where: {
          id: collectionId as string,
        },
      })
      const msg = {
        message: 'nft actualizado',
        data: collection,
      }
      res.status(200).send(msg)
    }
  } catch (e) {
    console.log(e)
  }
}
