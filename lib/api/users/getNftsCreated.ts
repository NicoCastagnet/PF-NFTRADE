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
    console.log(user)
    return user
  } catch (e) {
    console.log(e)
    return null
  }
}

export default getNftsCreated
