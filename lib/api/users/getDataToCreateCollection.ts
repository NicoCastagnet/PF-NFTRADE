// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { DataToCreateCollection } from 'types/api-responses'
/* this endpoint is for testing purposes */

const getDataToCreateCollection = async ({
  id,
}: {
  id: string
}): Promise<DataToCreateCollection | null> => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        email: true,
        emailVerified: true,
        image: true,
        coins: true,
        nftsOwned: {
          where: {
            erased: false,
          },
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
            published: true,
            collectionId: true,
          },
        },
      },
    })
    return user
  } catch (e) {
    console.error(e)
  }
}

export default getDataToCreateCollection
