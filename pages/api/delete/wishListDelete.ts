import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function deleteWL(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const { id } = req.query
    const idList = id
    if (!id) {
      res.status(400).send('Falta un id')
    } else {
      const list = await prisma.wishList.delete({
        where: {
          id: idList as string,
        },
      })
      const msg = {
        text: 'WhisList eliminada correctamente!',
      }
      res.status(205).json(msg)
    }
  }
}
