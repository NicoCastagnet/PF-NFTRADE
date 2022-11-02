interface nft {
  id: string
  name: string
  price: number
  verified: boolean
  db: boolean
}

export function orderByName(array: nft[], orden: string): nft[] {
  const array2 = [...array]
  if (orden === 'AZ') {
    array2.sort((a, b) => {
      if (b.name < a.name) return 1
      if (b.name > a.name) return -1
      return 0
    })
  }
  if (orden === 'ZA') {
    array2.sort((a, b) => {
      if (b.name > a.name) return 1
      if (b.name < a.name) return -1
      return 0
    })
  }

  return array2
}
