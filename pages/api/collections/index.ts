// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type NftsResponse = Prisma.CollectionGetPayload<{
  select: {
    id: true
    name: true
    image: true
    owner: {
      select: { name: true }
    }
    _count: {
      select: { nfts: true }
    }
  }
}>

/* this endpoint is for testing purposes */
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<NftsResponse[]>,
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
