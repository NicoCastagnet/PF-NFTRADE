// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function updateUser(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const { id } = req.query
    const { name, image, email } = req.body
    const user = await prisma.user.update({
      where: {
        id: id?.toString(),
      },
      data: {
        name: name,
        image: image,
        email: email,
      },
    })
    const msg = {
      text: 'Passed. User successffully updated.',
      data: user,
    }
    res.status(205).json(msg)
  }
}
