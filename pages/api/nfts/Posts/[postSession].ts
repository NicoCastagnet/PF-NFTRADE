import type { NextApiRequest, NextApiResponse } from 'next'

export default async function postSession(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { sessionToken, userId, expires } = req.body
  if (!sessionToken || !userId || !expires) {
    const datos: object = {
      sessionToken,
      userId,
      expires,
    }
    const msg: object = {
      info: 'la Session no pudo ser creada :C',
      data: datos,
    }
    res.status(400).send(msg)
  } else {
    const session: object = await prisma.session.create({
      data: {
        sessionToken,
        userId,
        expires,
      },
    })
    const msg: object = {
      info: 'Session creada!',
      data: session,
    }
    res.status(201).send(msg)
  }
}
