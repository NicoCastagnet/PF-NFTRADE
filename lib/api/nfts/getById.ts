// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NftDetailResponse } from 'types/api-responses'

const getNftById = async ({
  id,
}: {
  id: string
}): Promise<NftDetailResponse | null> => {
  try {
    const nft = await prisma.nft.findUniqueOrThrow({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        price: true,
        published: true,
        collectionId: true,
        comments: {
          select: {
            id: true,
            user: true,
            content: true,
            isPublished: true,
          },
        },
        likedBy: { select: { id: true } },
        owner: {
          select: { name: true, id: true },
        },
        creator: {
          select: { name: true },
        },
        _count: {
          select: { likedBy: true, viewedBy: true },
        },
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
        wishedBy: { select: { userId: true } },
      },
    })
    nft.wishedBy = nft.wishedBy.map((w) => w.userId)
    return nft
  } catch (e) {
    console.error(e)
  }
}

export default getNftById
