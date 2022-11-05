import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
export default async function payDescription(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'POST') {
      const { query } = req
      if (!query) {
        res.status(400).send('id is required')
      } else {
        const topic = query
        const topicId = topic.id
        if (topic.topic === 'merchant_order') {
          console.log(topic)
          const id = await prisma.buys.create({
            data: {
              buyId: topicId as string,
            },
          })
          console.log(id)
          res.status(200).send(topic)
        }
      }
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
