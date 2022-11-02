import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function updateCollection(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const { id } = req.query
    const { name, image, description, disccount, ownerId } = req.body
    if (!name) {
      res.status(400).send("Missing 'name' property.")
    } else {
      const cat = await prisma.collection.update({
        where: {
          id: id?.toLocaleString(),
        },
        data: {
          name,
          image,
          description: description,
          disccount,
          ownerId,
        },
      })
      const msg = {
        text: 'The collection was successfully updated.',
        data: cat,
      }
      res.status(205).json(msg)
    }
  }
}
