// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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
        admin: true,
        emailVerified: true,
        passwordHash: true,
        image: true,
        coins: true,
        collectionsCreated: {
          where: {
            erased: false,
          },
          take: 3,
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
            discount: true,
            price: true,
          },
        },
        collectionsOwned: {
          where: {
            erased: false,
          },
          take: 3,
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
            discount: true,
            price: true,
          },
        },
        nftsCreated: {
          where: {
            erased: false,
          },
          take: 6,
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
            published: true,
          },
        },
        nftsOwned: {
          where: {
            erased: false,
          },
          take: 6,
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
            published: true,
          },
        },
        wishes: {
          take: 6,
          select: {
            nft: {
              select: {
                id: true,
                name: true,
                image: true,
                price: true,
                published: true,
                erased: true,
              },
            },
          },
        },
      },
    })
    return user
  } catch (e) {
    console.error(e)
  }
}

export default getUserById
