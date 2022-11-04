interface nft {
  id: string
  name: string
  price: number
  likedBy: {
    id: string
  }[]
  db: boolean
}

export function orderByLikes(array: nft[], order: string): nft[] {
  const array2 = [...array]
  if (order === 'lessLiked') {
    array2.sort((a, b) => {
      if (b.likedBy.length < a.likedBy.length) return 1
      if (b.likedBy.length > a.likedBy.length) return -1
      return 0
    })
  }
  if (order === 'mostLiked') {
    array2.sort((a, b) => {
      if (b.likedBy.length > a.likedBy.length) return 1
      if (b.likedBy.length < a.likedBy.length) return -1
      return 0
    })
  }
  return array2
}
