import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function addoCoins(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const { coins, id } = req.body
    const userCoins = await prisma.user.findUnique({
      where: {
        id: id as string,
      },
      select: {
        coins: true,
      },
    })
    if (!userCoins) {
      res.status(400).send('An user is neccesary')
    } else {
      const totalCoins: number = coins + userCoins?.coins
      const user = await prisma.user.update({
        where: {
          id: id?.toString(),
        },
        data: {
          coins: totalCoins,
        },
      })
      const msg = {
        text: 'The coins were loaded succesfully.',
        data: user,
      }
      res.status(205).json(msg)
    }
  }
}
