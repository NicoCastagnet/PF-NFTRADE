// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function deleteCategory(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'DELETE') {
    const { id } = req.query
    if (!id) {
      res.status(400).send('Failed. Category ID was not provided.')
    } else {
      await prisma.category.delete({
        where: {
          id: id.toString(),
        },
      })
      const msg = {
        text: 'The category was successfully deleted.',
      }
      res.status(205).json(msg)
    }
  }
}
