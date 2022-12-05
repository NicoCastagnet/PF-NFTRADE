// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
/* this endpoint is for testing purposes */
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function getIsAdmin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query
  try {
    const user = await prisma.user.findUnique({
      select: {
        admin: true,
      },
      where: {
        id: id as string,
      },
    })

    if (user?.admin === true) {
      res.status(200).send(true)
    } else {
      res.status(201).send(false)
    }
  } catch (e) {
    console.error(e)
  }
}
