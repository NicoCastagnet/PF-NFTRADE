interface nft {
  id: string
  name: string
  price: number
  verified: boolean
  db: boolean
}

export function filterByPriceBetween(
  array: nft[],
  value1: number,
  value2: number,
): nft[] {
  let array2 = [...array]

  if (value1 > value2) {
    const temp = value1
    value1 = value2
    value2 = temp
  }

  array2 = array2.filter(
    (element) => element.price >= value1 && element.price <= value2,
  )
  return array2
}
