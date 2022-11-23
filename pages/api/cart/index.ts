import type { NextApiRequest, NextApiResponse } from 'next'
import emailNft from '../emails/nftBuy'
import prisma from '@lib/db'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { nfts, comprador } = req.body
  if (req.method === 'POST') {
    try {
      nfts.forEach(async (el: any) => {
        try {
          const comp: any = await prisma.user.findUnique({
            where: {
              id: comprador.id as string,
            },
            select: {
              id: true,
              coins: true,
              name: true,
            },
          })

          if (comp?.coins < el.price) {
            return res.status(404).json({
              msg: 'User do not have sufficient coins to conclude the purchase.',
            })
          }

          await prisma.nft.update({
            where: {
              id: el.id as string,
            },
            data: {
              owner: { connect: { id: comprador.id } },
              published: false,
            },
          })

          const nftComp = await prisma.nft.findUniqueOrThrow({
            where: {
              id: el.id,
            },
            select: {
              id: true,
              name: true,
              owner: true,
              ownerId: true,
            },
          })

          await prisma.user.updateMany({
            where: {
              id: comprador.id,
            },
            data: {
              coins: comp.coins - el.price,
            },
          })

          const vendedor: any = await prisma.user.findUnique({
            where: {
              id: el.owner.id as string,
            },
            select: {
              id: true,
              coins: true,
              name: true,
            },
          })

          await prisma?.user.updateMany({
            where: {
              id: vendedor.id,
            },
            data: {
              coins: vendedor.coins + el.price,
            },
          })

          await prisma.notify.create({
            data: {
              userId: vendedor.id,
              typeNotify: 'buyNft',
              nftId: el.id,
              nameNft: nftComp.name,
              ownerId: nftComp.owner.id,
              owner: nftComp.owner.name,
              compradorId: comp.id,
              coins: el.price,
              nameComprador: comp.name,
              vendedorId: vendedor.id,
              nameVendedor: vendedor.name,
            },
          })
          const date = await prisma?.notify.findMany({
            where: {
              userId: vendedor?.id,
            },
            orderBy: {
              createdAt: 'desc',
            },
          })
          const datebuy: any = date?.shift()
          emailNft(
            req,
            res,
            comprador.id,
            el.id,
            vendedor?.name,
            el.price,
            datebuy?.createdAt,
            'comprador',
          )
          emailNft(
            req,
            res,
            vendedor.id,
            el.id,
            comprador.id,
            el.price,
            datebuy?.createdAt,
            'vendedor',
          )
        } catch (error) {
          console.error(error)
        }
      })
    } catch (error) {
      console.error(error)
    }
  }
}
