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
    if (!name || !image) {
      res.status(400).send('Faltans datos')
    } else {
      const category = await prisma.category.create({
        data: {
          name,
          image,
        },
      })
      const msg = {
        text: 'categoría creada correctamente! ',
        data: category,
      }
      res.status(201).json(msg)
    }
  }
}
