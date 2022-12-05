// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postNft(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const { creatorId, name, image, description, price, categoriesNames } =
        req.body
      if (
        !creatorId ||
        !name ||
        !image ||
        !price ||
        !description ||
        categoriesNames.length < 1
      ) {
        res.status(400).send('Failed. Missing data')
      } else {
        let categoriesId: string[] | { id: string }[] =
          await prisma.category.findMany({
            where: {
              name: { in: categoriesNames },
            },
            select: {
              id: true,
            },
          })
        categoriesId = categoriesId.map((c) => c.id)
<<<<<<< HEAD
        console.log(categoriesId)
=======
>>>>>>> 399c7e80508c8e8f7849ada64f50cb46a4aad573
        const nfts = await prisma.nft.create({
          data: {
            creatorId,
            ownerId: creatorId,
            name,
            image,
            description,
            categories: {
              connect: categoriesId?.map((c) => ({ id: c })),
            },
            price,
            published: true,
          },
        })
        console.log(nfts)
        const msg = {
          text: 'The NFT was sucessfully created.',
          data: nfts,
        }
        res.status(201).json(msg)
      }
    }
  } catch (error: any) {
<<<<<<< HEAD
    console.log(error)
=======
    console.error(error)
>>>>>>> 399c7e80508c8e8f7849ada64f50cb46a4aad573
  }
}
