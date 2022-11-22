// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

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
    return user
  } catch (e) {
    console.error(e)
  }
}

export default getWishes
