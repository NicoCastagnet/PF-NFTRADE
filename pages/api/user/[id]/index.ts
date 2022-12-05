// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query
  if (id === 'undefined') {
    return res.status(204).json({
      success: false,
      status: 204,
      message: 'Failed. User is not logged in.',
    })
  } else {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: { id: id as string },
        include: {
          nftsOwned: {
            where: {
              erased: false,
            },
            include: {
              likedBy: true,
              viewedBy: true,
              wishedBy: true,
              creator: true,
            },
          },
        },
      })
      return res.json(user)
    } catch (e) {
      const apiMessage = (e as Error).message
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Failed. Couldn't find an user with id ${id}`,
        apiMessage,
      })
    }
  }
}
