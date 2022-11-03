import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postView(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { userId, nftId } = req.body
      if (!userId) return

      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
      })

      if (!user) {
        res.status(400).send('el user no existe o es requerido')
      } else {
        const nft = await prisma.nft.update({
          data: {
            viewedBy: {
              connect: { id: user.id },
            },
          },
          where: {
            id: nftId as string,
          },
          include: {
            viewedBy: true,
          },
        })

        const msg = {
          message: 'nft actualizado',
          data: nft.viewedBy,
        }
        res.status(200).send(msg)
      }
    }
  } catch (e: any) {
    console.log(e.message)
  }
}
