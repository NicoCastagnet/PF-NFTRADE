// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postCollection(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { name, image, description, disccount, creatorId } = req.body
    if (!name || !image || !description || !disccount || !creatorId) {
      res.status(400).send('Faltans datos')
    } else {
      const collection = await prisma.collection.create({
        data: {
          name,
          image,
          description,
          disccount,
          creatorId,
          ownerId: creatorId,
        },
      })
      const msg = {
        text: 'la colección fue creada correctamente!',
        data: collection,
      }
      res.status(201).json(msg)
    }
  }
}
