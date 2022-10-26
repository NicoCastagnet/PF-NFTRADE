import type { NextApiRequest, NextApiResponse } from 'next'
export default async function (_req: NextApiRequest, res: NextApiResponse) {
  const {
    name,
    email,
    emailVerified,
    image,
    accounts,
    sessions,
    nftsCreated,
    nftsOwned,
    collectionsCreated,
    collectionsOwned,
    wishes,
    likes,
    views,
  } = _req.body
  if (!name || !email || !emailVerified) {
    res.status(400).send('Faltan datos')
  } else {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        emailVerified,
        image,
        accounts,
        sessions,
        nftsCreated,
        nftsOwned,
        collectionsCreated,
        collectionsOwned,
        wishes,
        likes,
        views,
      },
    })
    const msg: object = {
      msg: 'User Creado correctamente :D',
      data: user,
    }
    res.status(201).send(msg)
  }
}
