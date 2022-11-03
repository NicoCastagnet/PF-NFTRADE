import SvgBell from '@components/icons/svgBell'
import SvgCart from '@components/icons/svgCart'
import SvgCoin from '@components/icons/svgCoin'
import SvgLogin from '@components/icons/svgLogin'
import SvgLogOut from '@components/icons/svgLogOut'
import SvgMarket from '@components/icons/svgMarket'
import SearchIcon from '@components/icons/svgSearch'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { VscSignIn } from 'react-icons/vsc'

const Hamburguesa = () => {
  const [hamburguer, setHamburguer] = useState(false)
  const { data: session } = useSession()

  return (
    <>
      <div
        className="flex flex-col gap-[0.4rem] relative"
        onClick={() => setHamburguer((state) => !state)}
      >
        <span
          className={` bg-white h-1 rounded-full ease duration-100 ${
            hamburguer
              ? 'rotate-45 origin-bottom-left translate-x-[0px]  w-[1.7rem]'
              : 'w-[2.2rem]'
          }`}
        ></span>
        <span
          className={` bg-white h-1 w-[2.2rem] rounded-full ease duration-100 ${
            hamburguer && 'opacity-0 '
          }`}
        ></span>
        <span
          className={` bg-white h-1  rounded-full ease duration-100 ${
            hamburguer
              ? '-rotate-45 origin-top-left translate-x-[0px] w-[1.7rem]'
              : 'w-[2.2rem]'
          }`}
        ></span>
        <div
          className={`${
            hamburguer ? ' opacity-100' : ' hidden translate-x-96 opacity-0'
          } fixed flex flex-col justify-between top-[5rem] left-0 w-full h-screen ease duration-75 bg-slate-800`}
        >
          <ul className="text-slate-400 text-2xl font-bold w-full flex flex-col items-start px-4 gap-2">
            {session && (
              <div className="flex justify-center items-center w-full  my-4 px-4 py-2 rounded-lg bg-slate-700  text-center">
                {session?.user.name || session?.user.username}
              </div>
            )}
            {session && (
              <Link href={'#'}>
                <li className="flex flex-row justify-satart items-center gap-4 hover:bg-gray-500 rounded-xl py-2 w-full px-6">
                  <span>
                    <SvgCoin width={'28'} height={'28'} />
                  </span>
                  <span>0</span> coins
                </li>
              </Link>
            )}
            <Link href={'#'}>
              <li className="flex flex-row justify-start items-center gap-4 hover:bg-gray-500 rounded-xl py-2 w-full px-6">
                <span>
                  <SvgCart width={'28'} height={'28'} />
                </span>
                <span>0</span>
                Shopping cart
              </li>
            </Link>
            {session && (
              <Link href={'#'}>
                <li className="flex flex-row justify-start items-center gap-4 hover:bg-gray-500 rounded-xl py-2 w-full px-6">
                  <span>
                    <SvgBell width={'28'} height={'28'} />
                  </span>
                  <span>0</span>
                  Notificaciones
                </li>
              </Link>
            )}
            <Link href={'#'}>
              <li className="flex flex-row justify-start items-center pl-8 gap-4 hover:bg-gray-500 rounded-xl py-2 w-full px-6">
                <span className="pr-6">
                  <SearchIcon width={'28'} height={'28'} />{' '}
                </span>
                Explore
              </li>
            </Link>
            <Link href={'/marketplace'}>
              <li className="flex flex-row justify-start items-center pl-8 gap-4 hover:bg-gray-500 rounded-xl py-2 w-full px-6">
                <span className="pr-6">
                  <SvgMarket width={'28'} height={'28'} />{' '}
                </span>
                Marketplace
              </li>
            </Link>
          </ul>
          <ul className="absolute text-slate-400 bottom-24 text-2xl font-bold w-full flex flex-col items-start px-4">
            {!session && (
              <div className="w-full">
                <li className="flex flex-row justify-start items-center pl-8 gap-4 py-2 w-full px-6">
                  <span>
                    <SvgLogin width={'28'} height={'28'} />
                  </span>
                  <Link href={'/login'}>
                    <span className="flex w-full justify-center items-center bg-slate-700 py-2 rounded-xl hover:bg-slate-500">
                      Login
                    </span>
                  </Link>
                </li>
                <li className="flex flex-row justify-start items-center pl-8 gap-4 py-2 w-full px-6">
                  <span>
                    <VscSignIn width={'28'} height={'28'} />
                  </span>
                  <Link href={'/reguister'}>
                    <span className="flex w-full justify-center items-center bg-slate-700 py-2 rounded-xl hover:bg-slate-500">
                      Register
                    </span>
                  </Link>
                </li>
              </div>
            )}
            {session && (
              <li className="flex flex-row justify-start items-center pl-8 gap-4 py-2 w-full px-6">
                <span>
                  <SvgLogOut width={'28'} height={'28'} />
                </span>
                <span
                  onClick={() => signOut()}
                  className="flex w-full justify-center items-center bg-slate-700 py-3 rounded-xl hover:bg-slate-500"
                >
                  LogOut
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
