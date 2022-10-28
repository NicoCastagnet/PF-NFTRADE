import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function updateAcc(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const { id } = req.query
    const { name, image, description, disccount, ownerId } = req.body
    const acc = await prisma.account.update({
      where: {
        id: id?.toString(),
      },
      data: {
        name,
        image,
        description,
        disccount,
        ownerId,
      },
    })
    const msg = {
      text: 'Acc actualizado correctamente!',
      data: acc,
    }
    res.status(205).json(msg)
  }
}
