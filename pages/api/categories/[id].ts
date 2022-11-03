import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query
  try {
    const categoryWithNfts = await prisma.category.findUniqueOrThrow({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        image: true,
        nfts: {
          select: {
            id: true,
            name: true,
            image: true,
            owner: {
              select: { name: true },
            },
            _count: {
              select: { likedBy: true, viewedBy: true },
            },
          },
        },
      },
    })
    return res.json(categoryWithNfts)
  } catch (e) {
    const apiMessage = (e as Error).message
    return res.status(404).json({
      success: false,
      status: 404,
      message: `Couldn't find a category with id ${id}`,
      apiMessage,
    })
  }
}
