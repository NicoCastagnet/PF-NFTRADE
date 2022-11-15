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

  const db = await prisma.user.findUnique({
    where: {
      id: user as string,
    },
    select: {
      admin: true,
    },
  })

  const coinsData = await prisma.buys.findMany({
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

  const nftData = await prisma.buyNfts.findMany({
    select: {
      nftsId: true,
      compradorId: true,
      vendedorId: true,
      coins: true,
      createdAt: true,
    },
  })

  const filteredSeller = nftData.filter((e) => e.vendedorId === user)
  const filteredSellerCoins = filteredSeller.map((e) => e.coins)
  const sum = filteredSellerCoins.reduce((acc, val) => {
    return acc + val
  }, 0)

  const filteredBuyer = nftData.filter((e) => e.compradorId === user)
  const filteredBuyerDates = filteredBuyer.map((e) => e.createdAt)
  const filteredBuyerCoins = filteredBuyer.map((e) => e.coins)

  res.json({
    admin: db?.admin,
    coinsData,
    nftData,
    staticDashData: {
      sellerCoins: sum,
      buyerCoins: filteredBuyerCoins,
      sellerSales: filteredSeller.length,
      buyerDates: filteredBuyerDates,
    },
  })
}
