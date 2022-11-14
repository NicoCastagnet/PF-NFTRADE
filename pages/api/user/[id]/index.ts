import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: id as string },
      include: {
        nftsOwned: true,
      },
    })
    return res.json(user)
  } catch (e) {
    const apiMessage = (e as Error).message
    return res.status(404).json({
      success: false,
      status: 404,
      message: `Couldn't find user with id ${id}`,
      apiMessage,
    })
  }
}
