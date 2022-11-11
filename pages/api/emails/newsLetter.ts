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
    subject: 'Novedades',
    text: `Hay nfts nuevos que han sido publicados en el marketplace, ven a echarles un vistazo!`,
  }
  transporter.sendMail(mailOptions, (Error, info) => {
    if (Error) {
      console.log(Error.message)
      res.status(500).send(Error.message)
    } else {
      console.log('email send')
      res.status(200).send('email send')
    }
  })
  res.status(200).send('Mail enviado')
}
