// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NftsResponse } from 'types/api-responses'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NftsResponse>,
) {
  const coinsData = await prisma.notify.findMany({
    where: {
      typeNotify: 'buy',
    },
    select: {
      ordenId: true,
      userId: true,
      coins: true,
      status: true,
      amount: true,
      createdAt: true,
    },
  })

  const nftData = await prisma.notify.findMany({
    where: {
      typeNotify: 'buyNft',
    },
    select: {
      nftId: true,
      compradorId: true,
      vendedorId: true,
      coins: true,
      createdAt: true,
      nameNft: true,
    },
  })

  const approved = coinsData.filter((e) => e.status === 'approved')
  const rejected = coinsData.filter((e) => e.status === 'rejected')
  const in_process = coinsData.filter((e) => e.status === 'in_process')

  res.json({
    coinsData,
    nftData,
    transactions: {
      approved: approved.length,
      rejected: rejected.length,
      in_process: in_process.length,
    },
  })
}
