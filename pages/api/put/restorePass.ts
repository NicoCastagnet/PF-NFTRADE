import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postComment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id, pass } = req.body
    const user = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
    })
    if (!user) {
      res.status(404).send('User no encontrado')
    } else {
      await prisma.user.update({
        data: {
          passwordHash: pass,
        },
        where: {
          id: id as string,
        },
      })
      res.status(200).send('comentario eliminado')
    }
  } catch (e: any) {
    console.log(e.message)
  }
}
