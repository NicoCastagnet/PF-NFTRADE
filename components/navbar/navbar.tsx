import SvgCart from '@components/icons/svgCart'
import SvgChevronDown from '@components/icons/svgChevronDown'
import SvgCoin from '@components/icons/svgCoin'
import SvgUser from '@components/icons/svgUser'
import Search from '@components/search'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { IoMenu } from 'react-icons/io5'
import Logo from './logo'
import Notificaciones from './notificaciones'
import UserMenuNavBar from './user'

export default function NavBar() {
  const [menu, setMen] = useState(false)

  const { data: session } = useSession()

  return (
    <nav className="navbar__nav h-20 bg-slate-900 w-full flex flex-row  text-center items-center  justify-center drop-shadow-lg fixed top-0 z-10 px-4">
      <div
        className={`${
          menu ? '' : 'hidden'
        } inset-0 fixed h-screen w-full z-[99]`}
        onClick={() => setMen((state) => !state)}
      ></div>

      <div className="flex flex-row justify-between items-center w-full max-sm:gap-4">
        <Logo />

        <Search />

        <div className="max-sm:hidden flex flex-row justify-between items-center w-full max-[820px]:gap-2 max-[820px]:flex-col-reverse">
  
          <div className="navbar__buttons flex flex-row justify-end items-center text-white">
            {/* ------------- RUTAS NAVBAR ------------------ */}
            <div className="flex flex-row justify-center items-center max-[1145px]:hidden ease duration-150">
              <Link href={'#'}>
                <button className="m-3">Explore</button>
              </Link>
              <Link href="/marketplace">
                <button className="m-3">Marketplace</button>
              </Link>
            </div>
            {/* ----------------------------------------------- */}

            {session && <SvgCoin className="m-3" width={'25'} height={'25'} />}
            <SvgCart className="m-3" width={'25'} height={'25'} />

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
        <div className="sm:hidden flex justify-center items-center">
          <IoMenu size={52} color={'#00000099'} />
        </div>
      </div>
    </nav>
  )
}
