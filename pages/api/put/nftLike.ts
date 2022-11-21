// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postLike(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { userId, nftId, isLiked = false } = req.body

      const user = await prisma.user.findUnique({
        where: {
          id: userId as string,
        },
      })

      const nftDetail = await prisma.nft.findUnique({
        where: {
          id: nftId as string,
        },
        select: {
          id: true,
          name: true,
          ownerId: true,
        },
      })

      if (!user) {
        res.status(400).send('Failed. User ID was not found.')
      } else {
        const nft = await prisma.nft.update({
          data: {
            likedBy: {
              connect: !isLiked ? { id: user.id } : undefined,
              disconnect: isLiked ? { id: user.id } : undefined,
            },
          },
          where: {
            id: nftId as string,
          },
          include: {
            likedBy: true,
          },
        })
        await prisma.notify.create({
          data: {
            typeNotify: 'Liked',
            userId: nftDetail.ownerId,
            nameUser: user.name,
            nftId: nftDetail?.id,
            nameNft: nftDetail?.name,
            userIdLiked: user.id,
            nameUserLiked: user.name,
          },
        })
        const msg = {
          message: 'Passed. NFT successffully updated.',
          data: nft,
        }
        res.status(200).send(msg)
      }
    }
  } catch (e) {
    console.error(e)
  }
}
