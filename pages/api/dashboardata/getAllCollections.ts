import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const collections = await prisma.collection.findMany({
    include: {
      owner: true,
      creator: true,
    },
  })

  res.json({
    collections,
  })
}
