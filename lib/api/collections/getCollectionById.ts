// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { CollectionDetailResponse } from 'types/api-responses'

const getCollectionById = async ({
  id,
}: {
  id: string
}): Promise<CollectionDetailResponse | null> => {
  try {
    const collection = await prisma.collection.findUniqueOrThrow({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        discount: true,
        published: true,
        owner: {
          select: { name: true, id: true },
        },
        creator: {
          select: { name: true },
        },
        price: true,
        nfts: {
          select: {
            id: true,
            name: true,
            ownerId: true,
            image: true,
            price: true,
            owner: {
              select: { name: true, id: true },
            },
            _count: {
              select: { likedBy: true, viewedBy: true },
            },
          },
        },
      },
    })
    return collection
  } catch (e) {
    console.error(e)
  }
}

export default getCollectionById
