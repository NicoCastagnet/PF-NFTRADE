import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const { id } = req.query
    const { name, image } = req.body
    const user = await prisma.account.update({
      where: {
        id: id?.toString(),
      },
      data: {
        name: name,
        image: image,
      },
    })
    const msg = {
      text: 'User actualizado correctamente!',
      data: user,
    }
    res.status(205).json(msg)
  }
}
