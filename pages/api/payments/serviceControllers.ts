import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
export default class PaymentService {
  async createPayment(req: NextApiRequest, res: NextApiResponse) {
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
      notification_url:
        'https://32ed-190-245-83-198.sa.ngrok.io/api/notificaciones',
      payer_email: 'test_user_46945293@testuser.com ',
      items: datos,
      back_urls: {
        failure: '/failure',
        pending: '/pending',
        success: '/localhost:3000',
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
