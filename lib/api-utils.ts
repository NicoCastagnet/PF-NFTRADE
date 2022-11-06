const getOrderBy = (order: string | undefined) => {
  const posibleFields = ['price', 'name', 'likes', 'views', 'createdAt']
  const posibleOrders = ['asc', 'desc']
  const orders = order?.split(',')
  const orderBy: { [x: string]: string | { _count: string } }[] = []
  orders?.forEach((order) => {
    const [f, o] = order.split('_')
    if (f && o) {
      if (posibleFields.includes(f) && posibleOrders.includes(o)) {
        if (f === 'likes' || f === 'views') {
          orderBy.push({
            [f === 'likes' ? 'likedBy' : 'viewedBy']: { _count: o },
          })
        } else {
          orderBy.push({ [f]: o })
        }
      }
    }
  })
  return orderBy
}

const getWhere = (minPrice: string, maxPrice: string) => {
  const min = isNaN(parseInt(minPrice)) ? 0 : +minPrice
  const max = isNaN(parseInt(maxPrice)) ? 99999 : +maxPrice
  const where = {
    price: {
      lte: max,
      gte: min,
    },
  }
  return where
}

export { getOrderBy, getWhere }
