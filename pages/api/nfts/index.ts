// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { Prisma } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

type NftsResponse = Prisma.NftGetPayload<{
  select: {
    id: true
    name: true
    image: true
    owner: {
      select: { name: true }
    }
    _count: {
      select: { likedBy: true; viewedBy: true }
    }
    categories: {
      select: {
        id: true
        name: true
      }
    }
  }
}>

/* this endpoint is for testing purposes */
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<NftsResponse[]>,
) {
  const nfts = await prisma.nft.findMany({
    select: {
      id: true,
      name: true,
      image: true,
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
