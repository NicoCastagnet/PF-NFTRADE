import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'

export const images = [
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7705302.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7705320.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7705323.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7705326.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7705332.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7748160.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7748166.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7748169.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7748172.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7748175.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7748178.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7748184.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/7748187.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611033.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611042.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611054.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166714-Monkey-001.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166714-Monkey-27-1.png',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166714-TheDeaf.png',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166714-aprint.png',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166714-pizzaaa.png',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166717-1f468-1f4bb.png',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166719-adidas-nft-bored-ape-810x524.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166719-bayc2.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166722-psyco.png',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166723-hand-drawn-nft-style-ape-illustration_23-2149622015.jpg',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166723-withhat.png',
  'https://tdhdjernzsaepxgzandc.supabase.co/storage/v1/object/public/nfts/public/166724-hand-drawn-nft-style-ape-illustration_23-2149622015.jpg',
]

export const createCategories = (): Prisma.CategoryCreateInput[] =>
  [
    'Art',
    'Music',
    'Trading Cards',
    'Collectibles',
    'Photography',
    'Utility',
    'Sports',
    'Gamming',
  ].map((name) => ({ name, image: faker.image.imageUrl() }))

export const createUsers = (): Prisma.UserCreateInput[] => {
  const users = []
  for (let x = 1; x <= 15; x++) {
    users.push({
      name: faker.name.fullName(),
      email: faker.internet.email(),
    })
  }

  return users
}

const getRandomItem = (items: unknown[]) =>
  items[Math.floor(Math.random() * items.length)]

export const createNfts = (
  users: string[],
  collections: string[],
): Prisma.NftCreateManyInput[] => {
  const nfts = []
  for (let x = 1; x <= 50; x++) {
    nfts.push({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.datatype.float({ min: 10, max: 100, precision: 0.01 }),
      image: getRandomItem(images) as string,
      ownerId: getRandomItem(users) as string,
      creatorId: getRandomItem(users) as string,
      published: faker.datatype.boolean(),
      collectionId:
        x > 0 && x % 4 === 0 ? (getRandomItem(collections) as string) : null,
    })
  }
  return nfts
}

export const createCollections = (
  users: string[],
): Prisma.CollectionCreateManyInput[] => {
  const collections = []
  for (let x = 1; x <= 5; x++) {
    collections.push({
      name: faker.commerce.productName(),
      disccount: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
      ownerId: getRandomItem(users) as string,
      creatorId: getRandomItem(users) as string,
    })
  }
  return collections
}
