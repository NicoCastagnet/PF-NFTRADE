// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function mailSendNews(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email } = req.query
  const mail = await prisma.user.findUniqueOrThrow({
    where: {
      email: email?.toString(),
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
      pass: 'brrlzontwvkikdzr',
    },
  })
  const mailOptions = {
    from: 'NFTrade',
    to: mail.email as string,
    subject: 'Novedades',
    text: `Thanks for subscribe to our NewsLetter!`,
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err.message)
    } else {
      console.info('Passed. Email sent.' + info)
    }
  })
}
