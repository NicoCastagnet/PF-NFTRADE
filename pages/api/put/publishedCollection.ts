// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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
        message: 'Passed. Collection successffully updated.',
        data: collection,
      }
      res.status(200).send(msg)
    }
  } catch (e) {
    console.error(e)
  }
}
