import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
export default async function mailSend(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const { user, email } = req.body
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
      to: email as string,
      subject: 'BIENVENID@!',
      text: `Hola! ${user}, te damos la bienvenida a nuestra página NFTrade! Esperamos que disfrutes el recorrido por ella. Un saludo de parte de todo el equipo!`,
    }
    transporter.sendMail(mailOptions, (Error, info) => {
      if (Error) {
        console.log(Error.message)
      } else {
        console.log('email send')
      }
    })
    res.status(200).send('recived')
  }
}
