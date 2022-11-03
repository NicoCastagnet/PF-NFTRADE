// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getOrderBy } from '@lib/api-utils'
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NftsResponse } from 'types/api-responses'

/* this endpoint is for testing purposes */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NftsResponse>,
) {
  const { limit, order, page } = req.query
  const take = limit && !isNaN(+limit) && +limit > 1 ? +limit : undefined
  const orderBy = getOrderBy(order as string)
  const skip =
    page && limit ? Math.max(+page - 1, 1) * Math.max(+limit, 1) : undefined

  const nfts = await prisma.nft.findMany({
    orderBy,
    take,
    skip,
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
      comments: {
        select: {
          id: true,
          content: true,
          isPublished: true,
          user: { select: { name: true } },
        },
      },
      published: true,
      likedBy: {
        select: {
          id: true,
        },
      },
      owner: {
        select: { name: true },
      },
      _count: { select: { likedBy: true, viewedBy: true } },
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
  res.status(200).json(nfts)
}
