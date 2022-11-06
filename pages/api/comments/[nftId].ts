import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { CommentsResponse } from 'types/api-responses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentsResponse>,
) {
  const { nftId: id } = req.query
  const comments = await prisma.comment.findMany({
    where: { nftId: id as string },
    select: {
      id: true,
      content: true,
      createdAt: true,
      isPublished: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
  return res.json(comments)
}
