import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const coinsData: any = await prisma.notify.findMany({
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

  const nftData: any = await prisma.notify.findMany({
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

  const approved = coinsData.filter(
    ({ status }: { status: string }) => status === 'approved',
  )
  const rejected = coinsData.filter(
    ({ status }: { status: string }) => status === 'rejected',
  )
  const in_process = coinsData.filter(
    ({ status }: { status: string }) => status === 'in_process',
  )

  res.json({
    nftData: nftData,
    coinsData: coinsData,
    transactions: {
      approved: approved.length,
      rejected: rejected.length,
      in_process: in_process.length,
    },
  })
}
