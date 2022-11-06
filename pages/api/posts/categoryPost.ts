// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postCategory(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { name, image } = req.body
    if (!name) {
      res.status(400).send("Missing 'name' property.")
    } else {
      const img: string = image
      const category = await prisma.category.create({
        data: {
          name,
          image: img
            ? img
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCB9tB3P7DWxNB466mjV8mRanhrj2snehAvbDqSXunYg&s',
        },
      })
      const msg = {
        text: 'The category was successfully created.',
        data: category,
      }
      res.status(201).json(msg)
    }
  }
}
