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
    if (!name || !disccount || !creatorId) {
      res.status(400).send('Missing data.')
    } else {
      const img: string = image
      const collection = await prisma.collection.create({
        data: {
          name,
          image: img
            ? img
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCB9tB3P7DWxNB466mjV8mRanhrj2snehAvbDqSXunYg&s',
          description,
          disccount,
          creatorId,
          ownerId: creatorId,
        },
      })
      const msg = {
        text: 'The collection was successfully deleted.',
        data: collection,
      }
      res.status(201).json(msg)
    }
  }
}
