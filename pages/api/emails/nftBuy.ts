// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import prisma from '@lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
export default async function emailNft(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
  nftId: string,
  sellerOrBuyer: string,
  price: string,
  date: string,
  reason: string,
) {
  if (reason === 'comprador') {
    const info = await prisma.nft.findUnique({
      where: { id: nftId as string },
      select: {
        name: true,
        ownerId: true,
        image: true,
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
        pass: 'brrlzontwvkikdzr',
      },
    })
    const mailOptions = {
      from: 'NFTrade',
      to: user?.email as string,
      subject: 'Compra de NFT',
      html: `
      <p> ${date} </p>
      <h1>THE NFT WAS SUCCESFULLY BUYED</h1>
      <div style="background-color:#e5e7eb; width: 40%; text-align: center;"> 
        <h3 style=>Congratulations! the buy to ${sellerOrBuyer} was concreted succesfully. Now you are the owner of ${info?.name}, for ${price} coins! </h3>
        <img width="300px" height="300px" src=${info?.image}  alt="nft"/>
      </div>
      <h3>Thanks for the purchased, enjoy your journey in the application!</h3>
      `,
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err.message)
      } else {
        console.info('Passed. Email sent.' + info)
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
    const buyer = await prisma.user.findUnique({
      where: { id: sellerOrBuyer },
      select: {
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
      to: user?.email as string,
      subject: 'Venta de NFT',
      html: `
      <p> ${date} </p>
      <h1>THE NFT WAS SUCCESFULLY BUYED</h1>
      <div style="background-color:#e5e7eb; width: 40%; text-align: center;"> 
        <h3 style=>Congratulations! the sale to ${buyer?.name} was concreted succesfully. Now the owner of ${info?.name} is ${buyer?.name}, for the amount of ${price} coins! </h3>
      </div>
      <h2> The amount of coins will be added to your account soon! </h2>
      <h3>Thanks for the purchased, enjoy your journey in the application!</h3>
      `,
    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error(err.message)
      } else {
        console.info('Passed. Email sent.' + info)
      }
    })
  }
}
