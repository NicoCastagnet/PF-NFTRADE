import prisma from '@lib/db'
/* this endpoint is for testing purposes */

import type { WishesResponse } from 'types/api-responses'

const getWishes = async ({ id }: { id: string }): Promise<WishesResponse> => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        image: true,

        wishes: {
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
    console.log(user)
    return user
  } catch (e) {
    console.log(e)
    return null
  }
}

export default getWishes