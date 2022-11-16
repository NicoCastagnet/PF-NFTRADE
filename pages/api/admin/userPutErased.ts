import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function updateNft(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    if (req.method === 'PUT') {
      const { id, boolean } = req.body

      const user = await prisma.user.update({
        where: {
          id: id?.toString(),
        },
        data: {
          erased: boolean,
        },
      })
      console.log(user)
      const msg = {
        text: 'The NFT was successfully updated.',
        data: user,
      }
      res.status(205).json(msg)
      console.log(user)
    }
  } catch (e: any) {
    console.log(e.message)
  }
}
