import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function deleteWL(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'DELETE') {
      const { id } = req.query
      if (!id) {
        res.status(400).send('Falta un id')
      } else {
        const list = await prisma.nft.delete({
          where: {
            id: id.toString(),
          },
        })
        const msg = {
          text: 'nft eliminado correctamente!',
        }
        res.status(205).json(msg)
      }
    }
  } catch (error: any) {
    console.log(error.message)
  }
}
