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
      console.log(userId, nftId)
      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
      })
      console.log(user)
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
        console.log(arr)
        if (arr?.includes(userId)) {
          const newArr = nft?.likedBy.filter((acc) => acc.id !== userId)
          const nftt = await prisma.nft.update({
            data: {
              likedBy: {
                set: newArr,
              },
            },
            where: {
              id: nftId as string,
            },
            include: {
              likedBy: true,
            },
          })
          console.log(nftt)
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
          console.log(nftt)
        }
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
