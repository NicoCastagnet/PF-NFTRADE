import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function unpostLike(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { userId, nftId } = req.query
      console.log(userId, nftId)
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
            likedBy: {
              disconnect: { id: user.id },
            },
          },
          where: {
            id: nftId as string,
          },
        })
        const msg = {
          message: 'nft actualizado',
          data: nft,
        }
        res.status(200).send(msg)
      }
    }
  } catch (e: any) {
    console.log(e.message)
  }
}
