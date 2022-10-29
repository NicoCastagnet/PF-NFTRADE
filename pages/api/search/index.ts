import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { SearchResponse } from 'types/api-responses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResponse>,
) {
  const { q } = req.query
  const results = await prisma.nft.findMany({
    where: {
      name: { contains: q as string, mode: 'insensitive' },
    },
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
    },
  })

  return res.status(200).json(results)
}
