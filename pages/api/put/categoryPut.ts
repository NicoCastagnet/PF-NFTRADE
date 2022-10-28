import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function updateCategory(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const { id } = req.query
    const { name, image } = req.body
    if (!name) {
      res.status(400).send("Falta el la propiedad 'name'")
    } else {
      const cat = await prisma.category.update({
        where: {
          id: id?.toLocaleString(),
        },
        data: {
          name: name,
          image: image,
        },
      })
      const msg = {
        text: 'Category actualizada correctamente!',
        data: cat,
      }
      res.status(205).json(msg)
    }
  }
}
