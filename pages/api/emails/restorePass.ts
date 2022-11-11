import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function mailSend(
  req: NextApiRequest,
  res: NextApiResponse,
  // id: string,
) {
  const { id } = req.body
  console.log(id)
  const mail = await prisma.user.findUniqueOrThrow({
    where: {
      id: id.toString(),
    },
    select: {
      email: true,
      name: true,
      passwordHash: true,
    },
  })

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'nftrade2022@gmail.com',
      pass: 'kgpcugakgejfmhhi',
    },
  })
  const mailOptions = {
    from: 'NFTrade',
    to: mail.email as string,
    subject: 'Recuperación de cntraseña',
    text: `${mail.name} esta es tu nueva contraseña: ${mail.passwordHash}`,
  }
  transporter.sendMail(mailOptions, (Error, info) => {
    if (Error) {
      res.status(500).send(Error.message)
    } else {
      console.log('email send')
      res.status(200).send('email send')
    }
  })
}
