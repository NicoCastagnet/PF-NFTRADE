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
        'https://f25f-190-7-10-181.sa.ngrok.io/api/notificaciones',
      items: datos,
      back_urls: {
        failure: '/failure',
        pending: '/pending',
        success: '/https://pf-nftrade.netlify.app',
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
