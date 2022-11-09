import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
export default async function emailNft(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  nftId: string,
  reason: string,
) {
  if (reason === 'comprador') {
    const info = await prisma.nft.findUnique({
      where: { id: nftId as string },
      select: {
        name: true,
        ownerId: true,
      },
    })

    const user = await prisma.user.findUnique({
      where: { id: userId as string },
      select: {
        email: true,
      },
    })

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'isaac72@ethereal.email',
        pass: '6wZFKd6u69EgKAuWsd',
      },
    })

    const mailOptions = {
      from: 'NFTrade',
      to: user?.email as string,
      subject: 'Compra de NFT',
      text: `¡La compra ha sido realizada con éxito! Ahora tú eres el poseedor del nft ${info?.name} Esperamos que disfrutes tu recorrido por la app. Un saludo, NFTrade!`,
    }

    transporter.sendMail(mailOptions, (Error, info) => {
      if (Error) {
        res.status(500).send(Error.message)
      } else {
        res.status(200).send('email enviado')
      }
    })
  } else if (reason === 'vendedor') {
    const info = await prisma.nft.findUnique({
      where: { id: nftId as string },
      select: {
        name: true,
        ownerId: true,
      },
    })

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        email: true,
      },
    })

    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: 'isaac72@ethereal.email',
        pass: '6wZFKd6u69EgKAuWsd',
      },
    })

    const mailOptions = {
      from: 'NFTrade',
      to: user?.email as string,
      subject: 'Venta de NFT',
      text: `¡La venta de ${info?.name} ha sido realizada con éxito! Esperamos que disfrutes tu recorrido por la app. Un saludo, NFTrade!`,
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
