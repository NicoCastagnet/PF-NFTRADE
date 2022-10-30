// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getOrderBy } from '@lib/api-utils'
import prisma from '@lib/db'
import type { NftsResponse } from 'types/api-responses'

interface GetNftsProps {
  limit?: number
  order?: string
}

/* this endpoint is for testing purposes */
export default async function getAllNfts({
  limit,
  order,
}: GetNftsProps = {}): Promise<NftsResponse> {
  const take = limit && !isNaN(+limit) && +limit > 1 ? +limit : undefined
  const orderBy = getOrderBy(order as string)

  const nfts = await prisma.nft.findMany({
    orderBy,
    take,
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
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
  return nfts
}
