// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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
      res.status(404).send('Failed. User ID was not found.')
    } else {
      await prisma.user.update({
        data: {
          passwordHash: pass,
        },
        where: {
          id: id as string,
        },
      })
      res.status(200).send('Passed. Comment successffully updated.')
    }
  } catch (e: any) {
    console.error(e.message)
  }
}
