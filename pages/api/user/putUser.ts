// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id, name, email, image } = req.body
  try {
    const newUser = await prisma.user.update({
      data: {
        name,
        email,
        image,
      },
      where: { id: id as string },
    })
    res.status(200).json(newUser)
  } catch (e) {
    console.error(e)
    const apiMessage = (e as Error).message
    return res.status(404).json({
      success: false,
      status: 404,
      message: `Failed. Couldn't find an user with id ${id}`,
      apiMessage,
    })
  }
}
