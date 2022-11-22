import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function deleteCollection(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const { id } = req.query
    if (!id) {
      res.status(400).send('Failed. Collection ID was not provided.')
    } else {
      await prisma.collection.delete({
        where: {
          id: id.toString(),
        },
      })
      const msg = {
        text: 'The collection was successfully deleted.',
      }
      res.status(205).json(msg)
    }
  }
}
