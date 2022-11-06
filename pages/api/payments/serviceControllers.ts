import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
export default class PaymentService {
  async createPayment(req: NextApiRequest, res: NextApiResponse) {
    const url = 'https://api.mercadopago.com/checkout/preferences'
    const { quantity, unit_price, idUser } = req.body
    const datos = [
      {
        title: 'Coins',
        description: 'Coins',
        picture_url: 'Coins',
        category_id: 'Coins',
        quantity: quantity,
        unit_price: unit_price,
        id: idUser,
      },
    ]
    const body = {
      notification_url: 'https://15a7-190-7-10-181.sa.ngrok.io/api/prueba',
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
