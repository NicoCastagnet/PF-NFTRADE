import type { NextApiRequest, NextApiResponse } from 'next'
import type serviceControllers from './serviceControllers'
export default class PaymentController {
  subscriptionService: serviceControllers
  constructor(subscriptionService: serviceControllers) {
    this.subscriptionService = subscriptionService
  }

  async getPaymentLink(req: NextApiRequest, res: NextApiResponse) {
    try {
      const payment = await this.subscriptionService.createPayment(req, res)

      return res.json({ payment: payment.init_point })
    } catch (error: any) {
      console.log(error.message)

      return res
        .status(500)
        .json({ error: true, msg: 'Failed to create payment ' + error })
    }
  }
}
