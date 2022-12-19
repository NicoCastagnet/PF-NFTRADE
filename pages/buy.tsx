// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import axios from 'axios'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

const BuyPage: NextPage = () => {
  const [customValue, setCustomValue] = useState(0)
  const { data: session } = useSession()

  const paymentFunction = async (unit: number, price: number) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/payments`,
      {
        quantity: unit,
        unit_price: price,
        idUser: session?.user.id,
      },
    )
    window.open(res.data.payment, '_blank')
  }

  return (
    <>
      <Head>
        <title>NFTrade | Buy coins</title>
      </Head>
      <section className="flex flex-col justify-center items-center p-10 bg-gray-200 dark:bg-[#202225] text-gray-600 dark:text-gray-400 transition-all">
        <div className="container">
          <div className="max-sm:flex max-sm:items-center max-sm:justify-center">
            <Link href="/">
              <a>
                <button className="bg-white dark:bg-[#303339] w-32 h-auto text-center py-5 rounded-md text-gray-600 dark:text-gray-400 font-semibold drop-shadow-sm max-sm:flex max-sm:justify-center">
                  Return home
                </button>
              </a>
            </Link>
          </div>
          <div className="text-center mx-auto mb-[60px] max-w-[510px] max-sm:mb-6">
            <h2 className="font-bold text-[40px] text-blue-600 mb-4">
              Pricing table
            </h2>
            <p className="text-base">
              Buy your first package of coins and start exploring our amazing
              marketplace!{' '}
              <span className=" text-gray-500 ">
                (To buy, you must use a{' '}
                <a
                  href="https://www.mercadopago.com.ar/developers/es/docs/subscriptions/integration-test/create-test-user"
                  target="_blank"
                  className=" text-blue-500 hover:text-blue-400 "
                  rel="noreferrer"
                >
                  {' '}
                  {'Mercado Pago'} test account
                </a>
                . <br />
                See more about{' '}
                <a
                  href="https://www.mercadopago.com.ar/developers/es/docs/subscriptions/integration-test/create-test-user"
                  target="_blank"
                  className=" text-blue-500 hover:text-blue-400 "
                  rel="noreferrer"
                >
                  {' '}
                  test accounts{' '}
                </a>{' '}
                and{' '}
                <a
                  href="https://www.mercadopago.com.ar/developers/es/docs/checkout-api/integration-test/test-cards"
                  target="_blank"
                  className=" text-blue-500 hover:text-blue-400 "
                  rel="noreferrer"
                >
                  {' '}
                  test cards.{' '}
                </a>
                )
              </span>
            </p>
            <p className=" text-[1rem] "></p>
          </div>
          <div className="flex md:flex-nowrap flex-wrap justify-center">
            <div className="bg-white dark:bg-[#303339] rounded-xl py-10 px-8 min-w-[300px] w-1/3 mx-3 mb-5 drop-shadow-md">
              <span className="font-semibold text-3xl block mb-4 text-blue-500 max-sm:text-xl max-sm:mb-2">
                Base package
              </span>
              <h2 className="font-bold mb-5 text-[42px] max-sm:text-xl max-sm:mb-2">
                $1.000
                <span className="text-base font-medium">/ ARS</span>
              </h2>
              <p className="text-base pb-8 mb-8 border-b border-[#F2F2F2] dark:border-gray-600 flex flex-col max-sm:text-base max-sm:mb-5 max-sm:pb-5">
                The perfect plan for starting at the NFT&apos;s world.
                <div className="flex items-center mt-5 max-sm:mt-4">
                  <SvgCoin />
                  <p className="mx-1">
                    {' '}
                    <span className="font-bold">500</span> coins included.
                  </p>
                </div>
              </p>
              <button
                className="w-full block text-base font-semibold bg-transparent border border-[#F2F2F2] dark:border-gray-600 rounded-md text-center p-4"
                onClick={() => paymentFunction(500, 2)}
              >
                Go to checkout
              </button>
            </div>
            <div className="bg-white dark:bg-[#303339] rounded-xl py-10 px-8 min-w-[300px] w-1/3 mx-3 mb-5 drop-shadow-md">
              <span className="font-semibold text-3xl block mb-4 text-blue-500 max-sm:text-xl max-sm:mb-2">
                Advanced package
              </span>
              <h2 className="font-bold mb-5 text-[42px] max-sm:text-xl max-sm:mb-2">
                $4.050
                <span className="text-base font-medium">/ ARS</span>
              </h2>
              <p className="text-base pb-8 mb-8 border-b border-[#F2F2F2] dark:border-gray-600 flex flex-col max-sm:text-base max-sm:mb-5 max-sm:pb-5">
                The perfect plan to create an empire of NFT&apos;s.
                <div className="flex items-center mt-5 max-sm:mt-4">
                  <SvgCoin />
                  <p className="mx-1">
                    {' '}
                    <span className="font-bold">1500</span> coins included.
                  </p>
                </div>
              </p>
              <button
                className="w-full block text-base font-semibold bg-transparent border border-[#F2F2F2] dark:border-gray-600 rounded-md text-center p-4"
                onClick={() => paymentFunction(1500, 2.7)}
              >
                Go to checkout
              </button>
            </div>
            <form
              className="bg-white dark:bg-[#303339] min-w-[300px] rounded-xl py-10 px-8 w-1/3 mx-3 mb-5 drop-shadow-md"
              onSubmit={(e) => {
                e.preventDefault()
                paymentFunction(customValue != 0 ? customValue : 1, 3)
              }}
            >
              <span className="font-semibold text-3xl block mb-4 text-blue-500 max-sm:text-xl max-sm:mb-2">
                Custom package
              </span>
              <h2 className="font-bold mb-5 text-[42px] max-sm:text-xl max-sm:mb-2 truncate">
                ${customValue ? (customValue * 3).toLocaleString('es-AR') : 3}
                <span className="text-base font-medium max-sm:text-lg">
                  {' '}
                  /ARS
                </span>
              </h2>
              <p className="text-base pb-8 mb-8 border-b border-[#F2F2F2] dark:border-gray-600 flex flex-col max-sm:text-base max-sm:mb-5 max-sm:pb-5">
                Set the quantity of coins that you want for your account!
                <div className="flex items-center mt-5">
                  <SvgCoin />
                  <input
                    type="number"
                    placeholder="Coins"
                    defaultValue={1}
                    required
                    className="mx-2 border rounded-md pl-1 w-20 border-[#F2F2F2] dark:border-gray-600 outline-none"
                    onChange={(e) =>
                      setCustomValue(
                        parseInt(e.target.value) <= 1
                          ? 1
                          : parseInt(e.target.value),
                      )
                    }
                  />
                </div>
              </p>
              <button
                className="w-full block text-base font-semibold bg-transparent border border-[#F2F2F2] dark:border-gray-600 rounded-md text-center p-4"
                type="submit"
              >
                Go to checkout
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default BuyPage
