import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function payDescription(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { payId } = req.body
    const data = prisma.buys.findUnique({
      where: {
        buyId: payId as string,
      },
      select: {
        buyId: true,
        userId: true,
        date: true,
        coins: true,
        status: true,
        amount: true,
        createdAt: true,
      },
    })
    res.status(200).send(data)
  }
}
