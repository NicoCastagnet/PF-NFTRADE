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
      coins: true,
    },
  })

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

  const filteredSeller = nftData.filter((e) => e.vendedorId === user)
  const filteredSellerCoins = filteredSeller.map((e) => e.coins)
  const sum = filteredSellerCoins.reduce((acc, val) => {
    return acc + val
  }, 0)

  const filteredBuyer = nftData.filter((e) => e.compradorId === user)
  const filteredBuyerDates = filteredBuyer.map((e) => e.createdAt)
  const filteredBuyerCoins = filteredBuyer.map((e) => e.coins)

  const userBuys = coinsData.filter((e) => e.userId === user)
  const approved = userBuys.filter((e) => e.status === 'approved')
  const rejected = userBuys.filter((e) => e.status === 'rejected')
  const in_process = userBuys.filter((e) => e.status === 'in_process')

  const userNFTS = nftData.filter((e) => e.compradorId === user)

  res.json({
    userNfts: userNFTS,
    userData: db,
    staticDashData: {
      sellerCoins: sum,
      buyerCoins: filteredBuyerCoins,
      sellerSales: filteredSeller.length,
      buyerDates: filteredBuyerDates,
    },
    userSells: {
      approved: approved.length,
      rejected: rejected.length,
      in_process: in_process.length,
    },
  })
}
