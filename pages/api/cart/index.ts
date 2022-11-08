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
        const comp = await prisma.user.findUniqueOrThrow({
          where: {
            id: comprador.id, //cla6smm630000ubg4jbywv6e2
          },
          select: {
            id: true, // cla6smm630000ubg4jbywv6e2
            coins: true, // 10.000
          },
        })

        await prisma.nft.update({
          //ok
          where: {
            id: el.id, // cla6h1h020004lutkl6wzwhxy (nft id)
          },
          data: {
            owner: { connect: { id: comprador.id } }, //cla6smm630000ubg4jbywv6e2 (nft owner id)
            published: false,
          },
        })

        // await prisma.nft.findUnique({
        //   where: {
        //     id: el.id, // cla6h1h020004lutkl6wzwhxy
        //   },
        //   select: {
        //     id: true,
        //     owner: true,
        //     ownerId: true,
        //   },
        // })

        await prisma.user.updateMany({
          where: {
            id: comprador.id, //cla6smm630000ubg4jbywv6e2 (nicolas id)
          },
          data: {
            coins: comp.coins - el.price, // 10.000 - 123
          },
        })

        const vendedor = await prisma.user.findUnique({
          where: {
            id: el.owner.id, //cla6gafci0000lutkwrtozc8c (id matias)
          },
          select: {
            id: true, //cla6gafci0000lutkwrtozc8c
            coins: true, //0
          },
        })

        await prisma?.user.updateMany({
          where: {
            id: vendedor.id, //cla6gafci0000lutkwrtozc8c
          },
          data: {
            coins: vendedor.coins + el.price, // 0 + 123
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
        emailNft(req, res, vendedor.id, el.id, 'vendedor')
        emailNft(req, res, comprador.id, el.id, 'comprador')
      })
    } catch (error) {
      console.log(error)
    }
  }
}
