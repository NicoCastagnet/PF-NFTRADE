// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
/* this endpoint is for testing purposes */
export default async function postToken(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { identifier, token, expires } = req.body
    if (!identifier || !token || !expires) {
      res.status(400).send('Faltans datos')
    } else {
      const tokenCreated = await prisma.VerificationToken.create({
        data: {
          identifier,
          token,
          expires,
        },
      })
      const msg = {
        text: 'Token creado correctamente! ',
        data: tokenCreated,
      }
      res.status(201).json(msg)
    }
  }
}
