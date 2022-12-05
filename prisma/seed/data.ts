// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { faker } from '@faker-js/faker'
import type { Prisma } from '@prisma/client'

export const images = [
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7705302.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7705320.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7705323.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7705326.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7705332.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748160.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748166.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748169.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748172.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748175.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748178.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748184.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/7748187.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/Monkey-001.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/Monkey-27-1.png',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/Screenshot-12-1.png',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/TheDeaf.png',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/aprint.png',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/clow.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/daaf-2.jpeg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/giphy.gif',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611030.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611033.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611042.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149611054.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149622012.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/hand-drawn-nft-style-ape-illustration_23-2149622015.jpg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/images.jpeg',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/nft.gif',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/pizzaaa.png',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/psyco.png',
  'https://jrgivjodpnydgnfmeelp.supabase.co/storage/v1/object/public/nfts/withhat.png',
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
      discount: faker.datatype.float({ min: 0, max: 5, precision: 0.1 }),
      ownerId: getRandomItem(users) as string,
      creatorId: getRandomItem(users) as string,
      price: faker.datatype.float({ min: 1, max: 5000 }),
    })
  }
  return collections
}
