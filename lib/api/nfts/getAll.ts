// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getOrderBy } from '@lib/api-utils'
import prisma from '@lib/db'
import type { NftsResponse } from 'types/api-responses'

interface GetNftsProps {
  limit?: number
  order?: string
  page?: number
}

/* this endpoint is for testing purposes */
export default async function getAllNfts({
  limit,
  order,
  page,
}: GetNftsProps = {}): Promise<NftsResponse> {
  const take = limit && !isNaN(+limit) && +limit > 1 ? +limit : undefined
  const orderBy = getOrderBy(order as string)
  const skip = page && limit ? (page - 1) * limit : undefined

  const nfts = await prisma.nft.findMany({
    orderBy,
    take,
    skip,
    where: {
      erased: false,
    },
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
      description: true,
      published: true,
      likedBy: {
        select: {
          id: true,
        },
      },
      owner: {
        select: { name: true, id: true },
      },
      _count: { select: { likedBy: true, viewedBy: true } },
      categories: true,
    },
  })
  return nfts
}
