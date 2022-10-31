import prisma from '@lib/db'

export default async function filterByPriceBetween(
  value1: number,
  value2: number,
) {
  let nfts = await prisma.nft.findMany()

  if (value1 > value2) {
    const temp = value1
    value1 = value2
    value2 = temp
  }

  nfts = nfts.filter(
    (element) => element.price >= value1 && element.price <= value2,
  )

  return nfts
}
