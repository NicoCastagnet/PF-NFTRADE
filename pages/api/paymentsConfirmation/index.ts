import prisma from '@lib/db'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function payDescription(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const id = await prisma.buys.findMany({
      select: {
        buyId: true,
        createdAt: true,
      },
    })
    const idObjc = id.pop()
    const idLit = idObjc?.buyId
    const url = `https://api.mercadolibre.com/merchant_orders/${idLit}`
    const payment = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ACCES_TOKEN_SELLER}`,
      },
    })
    console.log(payment.data)
    res.status(200).send(payment.data)
  }
}
