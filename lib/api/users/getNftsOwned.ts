import prisma from '@lib/db'
/* this endpoint is for testing purposes */

interface userNfts {
  id: string | null
  name: string | null
  image: string | null
  nftsOwned: object[]
}

const getNftsOwned = async ({ id }: { id: string }): Promise<userNfts> => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        image: true,

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
          },
        },
      },
    })
    return user
  } catch (e) {
    console.log(e)
    return null
  }
}

export default getNftsOwned
