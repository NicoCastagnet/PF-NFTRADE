import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function mailSend(
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
  reason: string,
) {
  const mail = await prisma.user.findUniqueOrThrow({
    where: {
      id: id.toString(),
    },
    select: {
      email: true,
      coins: true,
    },
  })

  if (reason === 'buy Coins') {
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
      subject: 'Buy confirmation',
      html: `
      <h1>Your buy for ${mail.coins} was accepted!</h1>
      <div style="background-color:#e5e7eb; width: 40%; text-align: center;"> 
        <h3 style=>Congratulations! we hope ou feel good in the tour of the aplication!</h3>
      </div>
      `,
    }
    transporter.sendMail(mailOptions, (Error, info) => {
      if (Error) {
        res.status(500).send(Error.message)
      } else {
        res.status(200).send('email enviado')
      }
    })
  } else if (reason === 'buy Rejected') {
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
      subject: 'card rejected',
      html: `
      <h1>Your buy for ${mail.coins} was rejected</h1>
      <div style="background-color:#e5e7eb; width: 40%; text-align: center;"> 
        <h3 style=>In name of the business we really sorry for the inconvenience</h3>
      </div>
      <h3>if you think it was an error of our page, pease try again!</h3>
      `,
    }

    transporter.sendMail(mailOptions, (Error, info) => {
      if (Error) {
        res.status(500).send(Error.message)
      } else {
        res.status(200).send('email enviado')
      }
    })
  }
}
