// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import CartSide from '@components/cart'
import SvgAdmin from '@components/icons/svgAdmin'
import SvgBell from '@components/icons/svgBell'
import SvgCart from '@components/icons/svgCart'
import SvgCoin from '@components/icons/svgCoin'
import SvgLogin from '@components/icons/svgLogin'
import SvgLogOut from '@components/icons/svgLogOut'
import SvgMarket from '@components/icons/svgMarket'
import SvgUser from '@components/icons/svgUser'
import { useCart } from '@context/cart'
import fetcher from '@lib/fetcher'
import useCoins from 'hook/useCoins'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { VscSignIn } from 'react-icons/vsc'
import useSWR from 'swr'
import NotifyResponsive from '../notify/notifyResponsive'

const Hamburguesa = () => {
  const { cart } = useCart()

  const [hamburguer, setHamburguer] = useState(false)
  const { session, coins } = useCoins()
  const [open, setOpen] = useState(false)
  const [openNotify, setOpenNotify] = useState(false)
  const URL = `/api/notificaciones?user=${session?.user.id}`
  const { data } = useSWR(URL, fetcher, { refreshInterval: 1000 })

  return (
    <>
      <div
        className="flex flex-col gap-[0.4rem] relative"
        onClick={() => setHamburguer((state) => !state)}
      >
        <span
          className={`bg-white dark:bg-[#3b3d41] h-1 rounded-full ease duration-100 ${
            hamburguer
              ? 'rotate-45 origin-bottom-left translate-x-[0px] w-[1.7rem]'
              : 'w-[2.2rem]'
          }`}
        ></span>
        <span
          className={`bg-white dark:bg-[#3b3d41] h-1 w-[2.2rem] rounded-full ease duration-100 ${
            hamburguer && 'opacity-0 '
          }`}
        ></span>
        <span
          className={`bg-white dark:bg-[#3b3d41] h-1 rounded-full ease duration-100 ${
            hamburguer
              ? '-rotate-45 origin-top-left translate-x-[0px] w-[1.7rem]'
              : 'w-[2.2rem]'
          }`}
        ></span>
        <div
          className={`${
            hamburguer ? 'opacity-100' : 'hidden translate-x-96 opacity-0'
          } fixed flex flex-col justify-between top-[5rem] left-0 w-full h-screen ease duration-75 bg-gray-700 dark:bg-[#303339]`}
        >
          <ul className="text-gray-300 text-2xl w-full flex flex-col items-start px-4 my-5 gap-2 overflow-auto max-h-[62%]">
            {session && (
              <div className="flex justify-center items-center w-full my-4 px-4 py-2 rounded-lg bg-slate-700 dark:bg-[#3b3d41] text-center">
                {session?.user.name || session?.user.username}
              </div>
            )}
            {session && (
              <Link href={'/buy'}>
                <a>
                  <li
                    key={'1'}
                    className="flex flex-row justify-satart items-center gap-4 hover:bg-gray-500 hover:dark:bg-[#3b3d41] rounded-xl py-2 w-full px-6"
                  >
                    <span>
                      <SvgCoin width={'28'} height={'28'} />
                    </span>
                    {coins && coins.toLocaleString('es-AR')} Coins
                  </li>
                </a>
              </Link>
            )}
            <>
              <li
                key={'2'}
                onClick={() => setOpen(!open)}
                className="flex flex-row justify-start items-center gap-4 hover:bg-gray-500 hover:dark:bg-[#3b3d41] rounded-xl py-2 w-full px-6"
              >
                <span>
                  <SvgCart width={'28'} height={'28'} />
                </span>
                <span>{cart?.length}</span>
                Cart
              </li>
              <CartSide isOpen={open} handleClose={setOpen} />
            </>

            {session && (
              <>
                <li
                  key={'3'}
                  onClick={() => setOpenNotify(!openNotify)}
                  className="flex flex-row justify-start items-center gap-4 hover:bg-gray-500 hover:dark:bg-[#3b3d41] rounded-xl py-2 w-full px-6"
                >
                  <span>
                    <SvgBell width={'28'} height={'28'} />
                  </span>
                  <span>{data?.total}</span>
                  Notifications
                </li>
                <NotifyResponsive
                  isOpen={openNotify}
                  handleClose={setOpenNotify}
                  data={data}
                />
              </>
            )}
            {session && (
              <Link href={`/users/${session.user.id}`}>
                <a>
                  <li
                    key={'5'}
                    className="flex flex-row justify-start items-center gap-4 hover:bg-gray-500 hover:dark:bg-[#3b3d41] rounded-xl py-2 w-full px-6"
                  >
                    <span className="pr-6">
                      <SvgUser width={'28'} height={'28'} />{' '}
                    </span>
                    Profile
                  </li>
                </a>
              </Link>
            )}
            <Link href={'/dashboard'}>
              <a>
                <li
                  key={'4'}
                  className="flex flex-row justify-start items-center gap-4 hover:bg-gray-500 hover:dark:bg-[#3b3d41] rounded-xl py-2 w-full px-6"
                >
                  <span className="pr-6">
                    <SvgAdmin width={'28'} height={'28'} />{' '}
                  </span>
                  Dashboard
                </li>
              </a>
            </Link>
            <Link href={'/marketplace'}>
              <a>
                <li
                  key={'5'}
                  className="flex flex-row justify-start items-center pl-[26px] gap-4 hover:bg-gray-500 hover:dark:bg-[#3b3d41] rounded-xl py-2 w-full px-6"
                >
                  <span className="pr-6">
                    <SvgMarket width={'28'} height={'28'} />{' '}
                  </span>
                  Marketplace
                </li>
              </a>
            </Link>
            <Link href={'/collectionmarket'}>
              <a>
                <li
                  key={'4'}
                  className="flex flex-row justify-start items-center pl-[26px] gap-4 hover:bg-gray-500 hover:dark:bg-[#3b3d41] rounded-xl py-2 w-full px-6"
                >
                  <span className="pr-6">
                    <SvgMarket width={'28'} height={'28'} />{' '}
                  </span>
                  Collections
                </li>
              </a>
            </Link>
          </ul>
          <ul className="absolute text-gray-300 bottom-24 text-2xl w-full flex flex-col items-start px-4">
            {!session && (
              <div className="w-full">
                <li
                  key={'6'}
                  className="flex flex-row justify-start items-center pl-8 gap-4 py-2 w-full px-6"
                >
                  <Link href={'/login'}>
                    <a>
                      <span className="flex w-full justify-center items-center bg-gray-500 hover:bg-gray-800 dark:bg-[#3b3d41] hover:dark:bg-[#3b3d41] py-2 rounded-xl">
                        <SvgLogin className="mr-2 h-6 w-6" />
                        Log in
                      </span>
                    </a>
                  </Link>
                </li>
                <li
                  key={'7'}
                  className="flex flex-row justify-start items-center pl-8 gap-4 py-2 w-full px-6"
                >
                  <Link href={'/register'}>
                    <a>
                      <span className="flex w-full justify-center items-center bg-gray-500 hover:bg-gray-800 dark:bg-[#3b3d41] hover:dark:bg-[#3b3d41] py-2 rounded-xl">
                        <VscSignIn className="mr-2 h-6 w-6" />
                        Register
                      </span>
                    </a>
                  </Link>
                </li>
              </div>
            )}
            {session && (
              <li
                key={'8'}
                className="flex flex-row justify-start items-center pl-8 gap-4 py-2 w-full px-6"
              >
                <SvgLogOut width={'28'} height={'28'} />
                <span
                  onClick={() => signOut()}
                  className="flex w-full justify-center items-center bg-slate-700 dark:bg-[#3b3d41] py-3 rounded-xl hover:bg-slate-500 hover:dark:bg-[#3b3d41]"
                >
                  Log out
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Hamburguesa
