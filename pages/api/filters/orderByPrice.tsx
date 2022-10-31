import prisma from '@lib/db'

export default async function orderByPrice(order: string) {
  const nfts = await prisma.nft.findMany()
  if (order == 'min') {
    nfts.sort((a, b) => {
      if (b.price < a.price) return 1
      if (b.price > a.price) return -1
      return 0
    })
  } else {
    nfts.sort((a, b) => {
      if (b.price > a.price) return 1
      if (b.price < a.price) return -1
      return 0
    })
  }
  return nfts
}
