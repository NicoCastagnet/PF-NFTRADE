import prisma from '@lib/db'
/* this endpoint is for testing purposes */

interface userNfts {
  id: string | null
  name: string | null
  image: string | null
  collectionsCreated: object[]
}

const getCollectionsCreated = async ({
  id,
}: {
  id: string
}): Promise<userNfts> => {
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: id as string },
      select: {
        id: true,
        name: true,
        image: true,

        collectionsCreated: {
          where: {
            erased: false,
          },
          select: {
            id: true,
            name: true,
            image: true,
            description: true,
            discount: true,
            price: true,
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

export default getCollectionsCreated
