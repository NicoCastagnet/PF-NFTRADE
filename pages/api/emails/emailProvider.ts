// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import nodemailer from 'nodemailer'

export default async function emailProvider(user: string, email: string) {
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
    to: email as string,
    subject: 'WELCOME!',
    html: `
    <h1>Hi! ${user} :D</h1> 
    <h3>welcome to NFTrade! We hope you really like our service.</h3> 
    <p>Don't forget to subscribe to our newsLetter to have constants news! ;)</p>
    `,
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error(err.message)
    } else {
      console.info('Email was successfully sent.' + info)
    }
  })
}
