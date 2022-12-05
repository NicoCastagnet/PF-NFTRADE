// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getOrderBy, getWhere } from '@lib/api-utils'
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { CollectionDetailResponse } from 'types/api-responses'

/* this endpoint is for testing purposes */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CollectionDetailResponse>,
) {
  const { limit, order, minPrice, maxPrice, page } = req.query
  const take = limit && !isNaN(+limit) && +limit > 1 ? +limit : undefined
  const orderBy = getOrderBy(order as string)
  const where = getWhere(minPrice as string, maxPrice as string)
  const skip =
    page && limit ? Math.max(+page - 1, 1) * Math.max(+limit, 1) : undefined

  console.log(minPrice)
  console.log(maxPrice)

  const collections = await prisma.collection.findMany({
    take,
    orderBy,
    skip,
    where: {
      price: {
        lte: parseInt(maxPrice),
        gte: parseInt(minPrice),
      },
      published: true,
    },
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
      description: true,
      discount: true,
      published: true,
      owner: {
        select: { id: true, name: true },
      },
    },
  })
  res.status(200).json(collections)
}
