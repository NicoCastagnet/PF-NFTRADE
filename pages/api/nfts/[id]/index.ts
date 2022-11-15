// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { id } = req.query
  try {
    const nft = await prisma.nft.findUniqueOrThrow({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        price: true,
        published: true,
        collectionId: true,
        comments: {
          select: {
            id: true,
            user: true,
            content: true,
            isPublished: true,
          },
        },
        likedBy: { select: { id: true } },
        owner: {
          select: { name: true, id: true },
        },
        creator: {
          select: { name: true },
        },
        _count: {
          select: { likedBy: true, viewedBy: true },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        wishedBy: { select: { userId: true } },
      },
    })
    nft.wishedBy = nft.wishedBy.map((w) => w.userId)
    return res.json(nft)
  } catch (e) {
    const apiMessage = (e as Error).message
    return res.status(404).json({
      success: false,
      status: 404,
      message: `Couldn't find nft with id ${id}`,
      apiMessage,
    })
  }
}
