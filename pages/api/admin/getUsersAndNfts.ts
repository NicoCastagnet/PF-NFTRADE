// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

/* this endpoint is for testing purposes */
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        coins: true,
        erased: true,
      },
      where: {
        admin: false,
      },
      orderBy: {
        name: 'asc',
      },
    })

    const nfts = await prisma.nft.findMany({
      select: {
        name: true,
        id: true,
        collectionId: true,
        creatorId: true,
        ownerId: true,
        image: true,
        erased: true,
        price: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const collections = await prisma.collection.findMany({
      select: {
        name: true,
        id: true,
        creatorId: true,
        ownerId: true,
        image: true,
        _count: {
          select: {
            nfts: true,
          },
        },
        nfts: {
          select: {
            id: true,
          },
        },
        erased: true,
        price: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const adminData = {
      users,
      nfts,
      collections,
    }

    res.status(206).json(adminData)
  } catch (e) {
    console.log(e)
  }
}
