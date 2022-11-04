import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postComment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { commentId, nftId } = req.body
    const nft = await prisma.nft.findUnique({
      where: {
        id: nftId as string,
      },
    })
    if (!nft) {
      res.status(404).send('User no encontrado')
    } else {
      await prisma.comment.update({
        data: {
          isPublished: false,
        },
        where: {
          id: commentId as string,
        },
      })
      res.status(200).send('comentario eliminado')
    }
  } catch (e: any) {
    console.log(e.message)
  }
}
