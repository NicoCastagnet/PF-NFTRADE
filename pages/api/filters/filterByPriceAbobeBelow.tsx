import prisma from '@lib/db'

export default async function filterByPriceAbobeBelow(
  value: number,
  filterBy: string,
) {
  let nfts = await prisma.nft.findMany()
  if (filterBy == 'abobe') {
    nfts = nfts.filter((element) => element.price >= value)
  } else {
    nfts = nfts.filter((element) => element.price <= value)
  }

  return nfts
}
