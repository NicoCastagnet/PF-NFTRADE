import prisma from '@lib/db'
import type { UserDetailResponse } from 'types/api-responses'
/* this endpoint is for testing purposes */

const getUserById = async ({
  id,
}: {
  id: string
}): Promise<UserDetailResponse | null> => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        passwordHash: true,
        image: true,
        coins: true,
        collectionsCreated: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
            disccount: true,
          },
        },
        collectionsOwned: {
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
            disccount: true,
          },
        },
        nftsCreated: {
          take: 6,
          select: { id: true, name: true, image: true, price: true },
        },
        nftsOwned: {
          take: 6,
          select: { id: true, name: true, image: true, price: true },
        },
        wishes: {
          select: {
            nft: { select: { id: true, name: true, image: true, price: true } },
          },
        },
        likes: {
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
          },
        },
        comments: {
          select: {
            id: true,
            nft: { select: { id: true, name: true, image: true, price: true } },
            isPublished: true,
            content: true,
          },
        },
        accounts: true,
        sessions: true,
      },
    })
    console.log(user)
    return user
  } catch (e) {
    return null
  }
}

export default getUserById
