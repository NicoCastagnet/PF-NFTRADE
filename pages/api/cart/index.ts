// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'

/* this endpoint is for testing purposes */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { nfts, comprador } = req.body

  if (req.method === 'POST') {
    try {
      nfts.forEach(async (el) => {
        const comp = await prisma.user.findUnique({
          where: {
            id: el.ownerId,
          },
          select: {
            id: true,
            coins: true,
          },
        })
        if (comp?.coins < el.price) {
          res.status(404).json({ msg: 'not coins' })
        }

        await prisma.nft.update({
          where: {
            id: el.id,
          },
          data: {
            owner: { connect: { id: comprador.id } },
            published: false,
          },
        })

        await prisma.nft.findUniqueOrThrow({
          where: {
            id: el.id,
          },
          select: {
            id: true,
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

        const vendedor = await prisma.user.findUnique({
          where: {
            id: el.ownerId,
          },
          select: {
            id: true,
            coins: true,
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

        await prisma.buyNfts.create({
          data: {
            nftsId: el.id,
            compradorId: comprador.id,
            vendedorId: vendedor.id,
            coins: el.price,
          },
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
}
