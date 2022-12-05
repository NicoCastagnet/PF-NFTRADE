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
    // if (req.method === 'POST') {
    //   try {
    //     const { nftId, userId, isLiked, owner, name } = req.body

    //     await prisma.nft.update({
    //       data: {
    //         likedBy: {
    //           connect: !isLiked ? { id: userId } : undefined,
    //           disconnect: isLiked ? { id: userId } : undefined,
    //         },
    //       },
    //       where: {
    //         id: nftId as string,
    //       },
    //       include: {
    //         likedBy: true,
    //       },
    //     })

    //     if (!isLiked) {
    //       const user = await prisma.user.findUnique({
    //         where: {
    //           id: userId as string,
    //         },
    //         select: {
    //           name: true,
    //         },
    //       })

    //       await prisma.notify.create({
    //         data: {
    //           typeNotify: 'Liked',
    //           userId: owner.id,
    //           nameUser: owner.name,
    //           nftId: nftId,
    //           nameNft: name,
    //           userIdLiked: userId,
    //           nameUserLiked: user.name,
    //         },
    //       })
    //     }
    //     if (isLiked) {
    //       const notas = await prisma.notify.findMany({
    //         where: {
    //           nftId: nftId,
    //         },
    //       })
    //       notas.map(async (el) => {
    //         if (el.typeNotify === 'Liked' && el.userIdLiked === userId) {
    //           await prisma.notify.delete({
    //             where: {
    //               id: el.id,
    //             },
    //           })
    //         }
    //       })
    //     }

    //     res.json('ok')
    //   } catch (error) {
    //     console.error(error)
    //   }
    // }

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
<<<<<<< HEAD
        const arr = nft?.likedBy.map((acc) => acc.id)
        console.log(nft?.likedBy)
        if (arr?.includes(userId)) {
          const newArr = nft?.likedBy.filter((acc) => acc.id !== userId)
          const nftt = await prisma.nft.update({
            data: {
              likedBy: {
                set: newArr,
              },
            },
            where: {
              id: nftId as string,
            },
            include: {
              likedBy: true,
            },
          })
          console.log(nftt)
        } else {
          const nftt = await prisma.nft.update({
            data: {
              likedBy: {
                connect: { id: user.id },
              },
            },
            where: {
              id: nftId as string,
            },
            include: {
              likedBy: true,
            },
          })
          console.log(nftt)
        }
=======
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
>>>>>>> 399c7e80508c8e8f7849ada64f50cb46a4aad573
        const msg = {
          message: 'Passed. NFT successffully updated.',
          data: nft,
        }
        res.status(200).send(msg)
      }
    }
  } catch (e) {
<<<<<<< HEAD
    console.log(e)
=======
    console.error(e)
>>>>>>> 399c7e80508c8e8f7849ada64f50cb46a4aad573
  }
}
