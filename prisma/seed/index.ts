import prisma from '../../lib/db'
import {
  createCategories,
  createCollections,
  createNfts,
  createUsers,
} from './data'

const flush = async () => {
  const propertyNames = Object.getOwnPropertyNames(prisma)
  const modelNames = propertyNames.filter(
    (propertyName) =>
      !propertyName.startsWith('_') && !propertyName.startsWith('$'),
  )

  // @ts-expect-error invalid model name
  await Promise.all(modelNames.map((model) => prisma[model].deleteMany()))
}

async function seed() {
  try {
    /* CLEAR DB */
    await flush()

    /* SEED CATEGORIES */
    await prisma.category.createMany({ data: createCategories() })

    /* SEED USERS */
    await prisma.user.createMany({ data: createUsers() })

    /* SEED COLLECTIONS */
    const usersCreated = await prisma.user.findMany({ select: { id: true } })
    await prisma.collection.createMany({
      data: createCollections(usersCreated.map((u) => u.id)),
    })

    /* SEED NFTS */
    const collectionsCreated = await prisma.collection.findMany({
      select: { id: true },
    })
    await prisma.nft.createMany({
      data: createNfts(
        usersCreated.map((u) => u.id),
        collectionsCreated.map((c) => c.id),
      ),
    })
  } catch (e) {
    console.log(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed()

export {}
