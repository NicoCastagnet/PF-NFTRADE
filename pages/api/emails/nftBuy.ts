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
  console.log(userId)
  console.log(nftId)
  console.log(reason)
  if (reason === 'comprador') {
    console.log(userId)
    console.log(nftId)
    console.log(reason)
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
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'nftrade2022@gmail.com',
        pass: 'kgpcugakgejfmhhi',
      },
    })
    console.log(user?.email)
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
    console.log(userId)
    console.log(nftId)
    console.log(reason)
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
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'nftrade2022@gmail.com',
        pass: 'kgpcugakgejfmhhi',
      },
    })

    console.log(user?.email)
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
