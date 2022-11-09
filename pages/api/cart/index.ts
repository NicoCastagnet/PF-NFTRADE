// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from 'next'
import emailNft from '../emails/nftBuy'
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
            id: comprador.id as string,
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
            id: el.id as string,
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
            id: el.owner.id as string,
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
        emailNft(req, res, comprador.id, el.id, 'comprador')
        emailNft(req, res, vendedor.id, el.id, 'vendedor')
      })
    } catch (error) {
      console.log(error)
    }
  }
}
