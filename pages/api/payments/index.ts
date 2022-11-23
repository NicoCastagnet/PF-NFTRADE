import type { NextApiRequest, NextApiResponse } from 'next'

import PaymentController from './paymentControllers'
import PaymentService from './serviceControllers'

const PaymentInstance = new PaymentController(new PaymentService())

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const pagos = await PaymentInstance.getPaymentLink(req, res)
    res.status(200).send(pagos)
  }
}
