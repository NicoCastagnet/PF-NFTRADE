interface nft {
  id: string
  name: string
  price: number
  verified: boolean
  db: boolean
}

export function filterByPriceAbobeBelow(
  array: nft[],
  value: number,
  filterBy: string,
): nft[] {
  let array2 = [...array]
  if (filterBy === 'above') {
    array2 = array2.filter((element) => element.price >= value)
  }
  if (filterBy === 'below') {
    array2 = array2.filter((element) => element.price <= value)
  }

  return array2
}
