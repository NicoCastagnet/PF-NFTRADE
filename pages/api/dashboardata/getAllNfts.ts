// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NftsResponse } from 'types/api-responses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NftsResponse>,
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
