import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const { id } = req.query
    if (!id) {
      res.status(400).send('Falta un id')
    } else {
      const user = await prisma.user.delete({
        where: {
          id: id.toString(),
        },
      })
      const msg = {
        text: 'User eliminada correctamente!',
      }
      res.status(205).json(msg)
    }
  }
}
