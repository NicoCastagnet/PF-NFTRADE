// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

/* this endpoint is for testing purposes */
export default async function postAcc(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    userId,
    type,
    provider,
    providerAccountId,
    refresh_token,
    access_token,
    expires_at,
    token_type,
    scope,
    id_token,
    session_state,
  } = _req.body
  if (
    !userId ||
    !type ||
    !provider ||
    !providerAccountId ||
    refresh_token ||
    access_token ||
    expires_at ||
    token_type ||
    scope ||
    id_token ||
    session_state
  ) {
    res.status(400).send('Faltans datos')
  } else {
    const Acc = await prisma.account.create({
      data: {
        userId,
        type,
        provider,
        providerAccountId,
        refresh_token,
        access_token,
        expires_at,
        token_type,
        scope,
        id_token,
        session_state,
      },
    })
    const msg = {
      text: 'Cuenta creada correctamente!',
      data: Acc,
    }
    res.status(201).json(msg)
  }
}
