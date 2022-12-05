// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import axios from 'axios'
import type { NextApiRequest } from 'next'
export default class PaymentService {
  async createPayment(req: NextApiRequest) {
    const url = 'https://api.mercadopago.com/checkout/preferences'
    const { quantity, unit_price, idUser } = req.body
    const datos = [
      {
        title: `x${quantity} coin.`,
        description: `Coins`,
        picture_url: 'Coins',
        category_id: `Coins`,
        quantity: quantity,
        unit_price: unit_price,
        id: idUser,
      },
    ]
    const body = {
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/notificaciones`,
      payer_email: 'test_user_46945293@testuser.com ',
      items: datos,
      back_urls: {
        failure: '/failure',
        pending: '/pending',
        success: 'https://pf-nftrade.netlify.app',
      },
    }

    const payment = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ACCES_TOKEN_SELLER}`,
      },
    })

    return payment.data
  }
}
