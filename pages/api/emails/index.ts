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
        pass: 'kgpcugakgejfmhhi',
      },
    })
    const mailOptions = {
      from: 'NFTrade',
      to: mail.email as string,
      subject: 'Confirmación de compra',
      text: `¡Tu compra ha sido realizada con éxito! Tus monedas ahora suman la cantidad de ${mail.coins}. Esperamos que disfrutes tu recorrido por la app. Un saludo, NFTrade!`,
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
        pass: 'kgpcugakgejfmhhi',
      },
    })

    const mailOptions = {
      from: 'NFTrade',
      to: mail.email as string,
      subject: 'Compra rechazada',
      text: `Tu compra de ${mail.coins} ha sido rechazada, lamentamos el inconveniente. Por favor, vuelve a intentarlo!. Esperamos que disfrutes tu recorrido por la app. Un saludo, NFTrade!`,
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
