import prisma from '@lib/db'
import nodemailer from 'nodemailer'

export default async function mailSend(email: string, pass: string) {
  const mail = await prisma.user.findUniqueOrThrow({
    where: {
      email: email as string,
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
    subject: 'Recuperación de contraseña',

    text: `${mail.name} esta es tu nueva contraseña: ${pass}`,
  }
  transporter.sendMail(mailOptions, (Error, info) => {
    if (Error) {
      console.log(Error.message)
    } else {
      console.log('email send')
    }
  })
}
