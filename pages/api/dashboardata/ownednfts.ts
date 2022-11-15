// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NftsResponse } from 'types/api-responses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NftsResponse>,
) {
  const { user } = req.query

  const data = await prisma.nft.findMany({
    select: {
      id: true,
      ownerId: true,
      likedBy: true,
      viewedBy: true,
    },
  })

  const userData = data.filter((e) => e.ownerId === user)

  res.json({
    userData,
  })
}
