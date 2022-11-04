import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'
export default class PaymentService {
  async createPayment(req: NextApiRequest, res: NextApiResponse) {
    const url = 'https://api.mercadopago.com/checkout/preferences'
    const { quantity, unit_price } = req.body
    const datos = [
      {
        title: 'Coins',
        description: 'Coins',
        picture_url: 'Coins',
        category_id: 'Coins',
        quantity: quantity,
        unit_price: unit_price,
      },
    ]
    const body = {
      payer_email: 'test_user_46945293@testuser.com',
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
        Authorization: `Bearer APP_USR-8325476199113387-110310-df457a6bce5bb54df314e0181a2890f4-1230928137`,
      },
    })

    return payment.data
  }
}
