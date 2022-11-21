// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
/* this endpoint is for testing purposes */

interface userNfts {
  id: string | null
  name: string | null
  image: string | null
  nftsCreated: object[]
}

const getNftsCreated = async ({ id }: { id: string }): Promise<userNfts> => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        image: true,

        nftsCreated: {
          where: {
            erased: false,
          },
          select: {
            id: true,
            name: true,
            image: true,
            price: true,
            published: true,
          },
        },
      },
    })
    return user
  } catch (e) {
    console.error(e)
  }
}

export default getNftsCreated
