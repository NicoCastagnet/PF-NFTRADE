import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcryptjs'
//
//
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // only post method is accepted
  if (req.method === 'POST') {
    if (!req.body) {
      return res.status(404).json({ error: "Don't have from data...!" })
    }
    const {
      username,
      email,
      password,
    }: 
    { username: string; email: string; password: string } = req.body
    console.log('aca arrancamos =>'+ email)
    // check duplicate users
    const checkExist = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (checkExist) {
      return res.status(422).json({ msg: 'User already exists...!' })
    }
    console.log('aca en hash =>')
    // // hash password
    const passwordhash = await hash(password, 5)
    const pri = await prisma?.user.create({
      data: {
        name: username,
        email,
        passwordHash: passwordhash,
        // : await hash(password, 12), function(err, data)  {
        //   if(err) return res.status(404).json({err})
        //   res.status(200).json({status: true, user: data})
        // }
      },
    })
    console.log(`despues de hash => ${pri}`)
  } else {
    res.status(500).json({ msg: 'HTTP method not supported' })
  }

  res.json({ msg: 'sign up requiered Post' })
}
