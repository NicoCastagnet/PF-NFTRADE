import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function deleteComment(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const { commentId } = req.body
    if (!commentId) {
      return res.status(400).json({ message: 'commentId is required' })
    } else {
      await prisma.comment.delete({
        where: {
          id: commentId as string,
        },
      })
      const msg = {
        text: 'The comment was deleted successfully.',
      }
      return res.status(205).json(msg)
    }
  }
  return res.status(401).json({ message: 'method not allowed' })
}
