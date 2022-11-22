// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import prisma from '@lib/db'
import { hash } from 'bcryptjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import mailSend from '../emails/restorePass'
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    if (req.body.email) {
      try {
        const flag = await prisma.user.findUnique({
          where: {
            email: req.body.email as string,
          },
          select: {
            name: true,
            passwordHash: true,
          },
        })
        if (flag.name && flag?.passwordHash !== null) {
          let generador = ''
          const characters =
            '0123456789abcdfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.?,;-_!*%&$/(){}|@><'
          for (let i = 0; i < 8; i++) {
            const aleatorio = Math.floor(Math.random() * characters.length)
            generador += characters.charAt(aleatorio)
          }
          const newPass = `Mdg84${generador}*`
          mailSend(req.body.email, newPass)
          const passHash = await hash(newPass, 5)
          await prisma.user.update({
            where: {
              email: req.body.email,
            },
            data: {
              passwordHash: passHash,
            },
          })
          res.status(200).send(passHash)
        } else {
          res.status(400).send('error')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
