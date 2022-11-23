import prisma from '@lib/db'
import type { SearchResponse } from 'types/api-responses'

interface SearchProps {
  q: string
}

const search = async ({ q }: SearchProps): Promise<SearchResponse> => {
  const results = await prisma.nft.findMany({
    where: {
      name: { contains: q as string, mode: 'insensitive' },
    },
    select: {
      id: true,
      name: true,
      image: true,
      price: true,
    },
  })
  return results
}

export default search
