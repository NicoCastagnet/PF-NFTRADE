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
      pass: 'brrlzontwvkikdzr',
    },
  })
  const mailOptions = {
    from: 'NFTrade',
    to: mail.email as string,
    subject: 'Restore password',
    html: `
    <h1>Hi, ${mail.name}.This is your new password: ${pass}. Dont share it whit anyone! ;) </h1>
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
