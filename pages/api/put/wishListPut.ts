// import prisma from '@lib/db'
// import type { NextApiRequest, NextApiResponse } from 'next'
// /* this endpoint is for testing purposes */
// export default async function updateWL(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method === 'PUT') {
//     const { id } = req.query
//     const { userId, nftId } = req.body
//     const list = await prisma.wishList.update({
//       where: {
//         id: id,
//       },
//       data: {
//         userId,
//         nftId,
//       },
//     })
//     const msg = {
//       text: 'WhisList actualizada correctamente!',
//       data: list,
//     }
//     res.status(205).json(msg)
//   }
// }
export {}
