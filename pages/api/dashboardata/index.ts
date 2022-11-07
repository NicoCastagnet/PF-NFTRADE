// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NftsResponse } from 'types/api-responses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NftsResponse>,
) {
  const data = await prisma.buys.findMany({
    select: {
      buyId: true,
      userId: true,
      date: true,
      coins: true,
      status: true,
      amount: true,
      createdAt: true,
    },
  })

  const data2 = await prisma.buyNfts.findMany({
    select: {
      nftsId: true,
      compradorId: true,
      vendedorId: true,
      coins: true,
      createdAt: true,
    },
  })

  res.json({ data, data2 })
}
