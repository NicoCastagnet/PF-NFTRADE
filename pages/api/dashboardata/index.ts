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

  const totalDate = nftData.map((e) => e.createdAt.toDateString())
  const totalBuyNft = nftData.map((e) => ({
    createdAt: e.createdAt,
    coins: e.coins,
  }))
  const totalFilterDate = new Set([...totalDate])
  const totatlArr = [...totalFilterDate]
  const totalGrafic = []

  totatlArr.forEach((el1) => {
    let newDate = { createdAt: el1, coins: 0, total: 0 }
    totalBuyNft.forEach((el2) => {
      if (el2.createdAt.toDateString() === el1) {
        newDate = {
          ...newDate,
          coins: newDate.coins + parseInt(el2.coins),
          total: newDate.total + 1,
        }
      }
    })
    totalGrafic.push(newDate)
  })

  const filtered = filteredBuyer.map((e) => e.createdAt.toDateString())
  const filteredBuyerDate = filteredBuyer.map((e) => ({
    createdAt: e.createdAt,
    coins: e.coins,
  }))

  const filterDate = new Set([...filtered])
  const arr = [...filterDate]
  const grafic = []

  arr.forEach((el1) => {
    let newDate = { createdAt: el1, coins: 0, total: 0 }
    filteredBuyerDate.forEach((el2) => {
      if (el2.createdAt.toDateString() === el1) {
        newDate = {
          ...newDate,
          coins: newDate.coins + el2.coins,
          total: newDate.total + 1,
        }
      }
    })
    grafic.push(newDate)
  })

  res.json({
    userNfts: userNFTS,
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
    SellerDate: grafic,
    adminSellerDate: totalGrafic,
  })
}
