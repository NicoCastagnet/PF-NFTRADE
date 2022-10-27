// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { HomeFeedResponse } from 'types/api-responses'

/* this endpoint is for testing purposes */
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<HomeFeedResponse>,
) {
  const nfts = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      nfts: {
        where: {
          published: true,
        },
        select: {
          id: true,
          name: true,
          image: true,
          price: true,
          owner: {
            select: {
              name: true,
            },
          },
          _count: {
            select: {
              likedBy: true,
            },
          },
        },
        take: 4,
      },
    },
    take: 5,
  })
  res.status(200).json(nfts)
}
