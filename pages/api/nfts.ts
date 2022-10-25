// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@lib/db'
import type { Nft } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

/* this endpoint is for testing purposes */
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Nft[]>,
) {
  const nfts = await prisma.nft.findMany()
  res.status(200).json(nfts)
}
