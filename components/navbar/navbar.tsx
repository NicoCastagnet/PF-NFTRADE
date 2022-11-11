// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import CartSide from '@components/cart'
import SvgCart from '@components/icons/svgCart'
import SvgChevronDown from '@components/icons/svgChevronDown'
import SvgCoin from '@components/icons/svgCoin'
import SvgUser from '@components/icons/svgUser'
import Search from '@components/search'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useOpenMenu } from '../../hook/openCartMenu'
import Hamburguesa from './hamburguesa'
import Logo from './logo'
import Notificaciones from './notify/notificaciones'
import UserMenuNavBar from './user'

export default function NavBar() {
  const [menu, setMen] = useState(false)
  const { data: session } = useSession()
  const { open, setOpen } = useOpenMenu()
  const [coins, setCoins] = useState('')

  const userCoins = async () => {
    const res = await axios.get(
      `http://localhost:3000/api/user/${session?.user.id}`,
    )
    setCoins(res.data.coins)
  }

  useEffect(() => {
    session && userCoins()
  }, [session, userCoins])

  useSession()

  return (
    <nav className="navbar__nav bg-slate-900 dark:bg-[#202225] h-20 w-full flex flex-row text-center items-center justify-center fixed top-0 z-10 px-4">
      <div
        className={`${
          menu ? '' : 'hidden'
        } inset-0 fixed h-screen w-full z-[99]`}
        onClick={() => setMen((state) => !state)}
      ></div>

      <div className="flex w-full max-md:gap-4">
        <Logo />
        <Search />
        <CartSide isOpen={open} handleClose={setOpen} />
        <div className="max-md:hidden flex justify-end items-center w-full">
          <div className="navbar__buttons flex items-center text-white">
            <div className="flex max-xl:hidden ease duration-150 justify-between w-[165px]">
              <Link href={'#'} shallow>
                <p className="relative group cursor-pointer">
                  <span className="font-semibold">Explore</span>
                  <span className="absolute -bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all group-hover:w-full"></span>
                </p>
              </Link>
              <Link href="/marketplace" shallow>
                <p className="relative group cursor-pointer">
                  <span className="font-semibold">Marketplace</span>
                  <span className="absolute -bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all group-hover:w-full"></span>
                </p>
              </Link>
            </div>
            {session && (
              <div className="flex flex-col items-center justify-center text-center group hover:text-blue-600 transition-all">
                <SvgCoin
                  className="m-3 ml-6 group-hover:animate-pulse"
                  width={'25'}
                  height={'25'}
                />
                <div className="absolute bg-gray-700 dark:bg-[#303339] w-auto h-11 p-3 top-16 invisible group-hover:visible flex items-center justify-center rounded-lg text-white">
                  {coins.toLocaleString('es-AR')} coins
                </div>
              </div>
            )}
            <SvgCart
              className="m-3 cursor-pointer hover:text-blue-600 transition-all hover:animate-pulse"
              width={'25'}
              height={'25'}
              onClick={() => setOpen(!open)}
            />
            {session && <Notificaciones />}
            <button
              id="dropdownInformationButton"
              data-dropdown-toggle="dropdownInformation"
              className="relative m-3"
              type="button"
              onClick={() => setMen((state) => !state)}
            >
              {session && session.user.image ? (
                <div className="flex items-center max-xl:gap-2 group">
                  <Image
                    src={session.user.image}
                    alt="user_image"
                    height={35}
                    width={35}
                    className="rounded-full"
                  />
                  <p className="m-2 max-xl:hidden font-medium ease duration-150 relative group cursor-pointer">
                    <span className="font-semibold">{session.user.name}</span>
                    <span className="absolute -bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all group-hover:w-full"></span>
                  </p>
                  <SvgChevronDown width={'15'} height={'15'} />
                </div>
              ) : (
                <div className="flex items-center gap-2 hover:text-blue-600 transition-all hover:animate-pulse">
                  <SvgUser width={'25'} height={'25'} />
                  <SvgChevronDown width={'15'} height={'15'} />
                </div>
              )}
            </button>
            {menu && <UserMenuNavBar menu={menu} />}
          </div>
        </div>
        <div className="md:hidden flex justify-center items-center ">
          <Hamburguesa />
        </div>
      </div>
    </nav>
  )
}
