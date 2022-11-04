import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postLike(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { userId, nftId } = req.body

      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
      })

      if (!user) {
        res.status(400).send('el user no existe o es requerido')
      } else {
        const nft = await prisma.nft.findUnique({
          where: {
            id: nftId as string,
          },
          include: {
            likedBy: true,
          },
        })
        const arr = nft?.likedBy.map((acc) => acc.id)
        if (arr?.includes(userId)) {
          const nftt = await prisma.nft.update({
            data: {
              likedBy: {
                disconnect: { id: user.id },
              },
            },
            where: {
              id: nftId as string,
            },
            include: {
              likedBy: true,
            },
          })
          console.log(nftt.likedBy)
        } else {
          const nftt = await prisma.nft.update({
            data: {
              likedBy: {
                connect: { id: user.id },
              },
            },
            where: {
              id: nftId as string,
            },
            include: {
              likedBy: true,
            },
          })
          console.log(nftt.likedBy)
        }
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
