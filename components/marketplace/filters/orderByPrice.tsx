interface nft {
  id: string
  name: string
  price: number
  verified: boolean
  db: boolean
}

export function orderByPrice(array: nft[], order: string): nft[] {
  const array2 = [...array]
  if (order === 'min') {
    array2.sort((a, b) => {
      if (b.price < a.price) return 1
      if (b.price > a.price) return -1
      return 0
    })
  }
  if (order === 'max') {
    array2.sort((a, b) => {
      if (b.price > a.price) return 1
      if (b.price < a.price) return -1
      return 0
    })
  }
  return array2
}
