import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postLike(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { userId, nftId, isLiked = false } = req.body

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
              connect: !isLiked ? { id: user.id } : undefined,
              disconnect: isLiked ? { id: user.id } : undefined,
            },
          },
          where: {
            id: nftId as string,
          },
          include: {
            likedBy: true,
          },
        })
        const msg = {
          message: 'nft actualizado',
          data: nft,
        }
        res.status(200).send(msg)
      }
    }
  } catch (e) {
    console.log(e)
  }
}
