import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postComment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { nftId, userId, content } = req.body
    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    })
    const nft = await prisma.nft.findUnique({
      where: {
        id: nftId as string,
      },
    })
    if (!user) {
      res.status(404).send('User no encontrado')
    } else if (!nft) {
      res.status(404).send('Nft no encontrado')
    } else {
      const comment = await prisma.comment.create({
        data: {
          content: content,
          nft: {
            connect: { id: nftId },
          },
          user: {
            connect: { id: userId },
          },
        },
      })
      res.status(200).send('comentario creado!')
    }
  } catch (e: any) {
    console.log(e.message)
  }
}
