// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { CollectionsResponse } from 'types/api-responses'

/* this endpoint is for testing purposes */
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<CollectionsResponse>,
) {
  const categories = await prisma.collection.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      owner: {
        select: { name: true },
      },
      _count: {
        select: {
          nfts: true,
        },
      },
    },
  })

  res.status(200).json(categories)
}
