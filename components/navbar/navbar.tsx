import CartSide from '@components/cart'
import SvgCart from '@components/icons/svgCart'
import SvgChevronDown from '@components/icons/svgChevronDown'
import SvgCoin from '@components/icons/svgCoin'
import SvgUser from '@components/icons/svgUser'
import Search from '@components/search'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useOpenMenu } from '../../hook/openCartMenu'
import Hamburguesa from './hamburguesa'
import Logo from './logo'
import Notificaciones from './notificaciones'
import UserMenuNavBar from './user'

export default function NavBar() {
  const [menu, setMen] = useState(false)
  const { data: session } = useSession()
  const { open, setOpen } = useOpenMenu()

  return (
    <nav className="navbar__nav h-20 bg-slate-900 w-full flex flex-row  text-center items-center  justify-center drop-shadow-lg fixed top-0 z-10 px-4">
      <div
        className={`${
          menu ? '' : 'hidden'
        } inset-0 fixed h-screen w-full z-[99]`}
        onClick={() => setMen((state) => !state)}
      ></div>

      <div className="flex flex-row justify-between items-center w-full max-md:gap-4">
        <Logo />

        <Search />

        <CartSide isOpen={open} handleClose={setOpen} />

        <div className="max-md:hidden flex flex-row justify-end items-center w-full">
          <div className="navbar__buttons flex flex-row justify-end items-center text-white">
            {/* ------------- RUTAS NAVBAR ------------------ */}
            <div className="flex flex-row justify-center items-center max-xl:hidden ease duration-150">
              <Link href={'#'} shallow>
                <button className="m-3 hover:text-blue-500 transition-all font-semibold">
                  Explore
                </button>
              </Link>
              <Link href="/marketplace" shallow>
                <button className="m-3 hover:text-blue-500 transition-all font-semibold">
                  Marketplace
                </button>
              </Link>
            </div>
            {/* ----------------------------------------------- */}
            {session && (
              <SvgCoin
                className="m-3 hover:text-blue-500 transition-all"
                width={'25'}
                height={'25'}
              />
            )}
            <SvgCart
              className="m-3 cursor-pointer hover:text-blue-500 transition-all"
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
                <div className="flex items-center max-xl:gap-2 hover:text-blue-600">
                  <Image
                    src={session.user.image}
                    alt="user_image"
                    height={35}
                    width={35}
                    className="rounded-full"
                  />
                  <p className="m-2 max-xl:hidden font-medium ease duration-150">
                    {session.user.name}
                  </p>
                  <SvgChevronDown width={'15'} height={'15'} />
                </div>
              ) : (
                <div className="flex items-center gap-2 hover:text-blue-600">
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
