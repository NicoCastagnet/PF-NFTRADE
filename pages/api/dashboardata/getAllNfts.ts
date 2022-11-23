  

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const nfts = await prisma.nft.findMany({
    include: {
      owner: true,
      wishedBy: true,
    },
  })

  res.json({
    nfts,
  })
}
