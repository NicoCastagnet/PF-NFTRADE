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
          select: { name: true },
        },
        creator: {
          select: { name: true },
        },
        _count: {
          select: { likedBy: true, viewedBy: true },
        },
        categories: true,
      },
    })
    return nft
  } catch (e) {
    console.log(e)
    return null
  }
}

export default getNftById
