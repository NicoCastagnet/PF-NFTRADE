import whiteLogo from '@assets/White.png'
import SvgCart from '@components/icons/svgCart'
import SvgChevronDown from '@components/icons/svgChevronDown'
import SvgCoin from '@components/icons/svgCoin'
import SvgUser from '@components/icons/svgUser'
import Search from '@components/search'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Notificaciones from './notificaciones'
import UserMenuNavBar from './user'

export default function NavBar() {
  const [menu, setMen] = useState(false)

  const { data: session } = useSession()

  return (
    <nav className="navbar__nav bg-slate-900 w-full flex flex-row max-[820px]:flex-col text-center items-center p-2 px-16 justify-between drop-shadow-lg fixed top-0 z-10">
      <div
        className={`${
          menu ? '' : 'hidden'
        } inset-0 fixed h-screen w-full z-[99]`}
        onClick={() => setMen((state) => !state)}
      ></div>
      <Link href={'/'}>
        <Image
          src={whiteLogo}
          alt="white_logo"
          height={80}
          width={150}
          className="cursor-pointer"
        />
      </Link>

      <div className="flex flex-row justify-between items-center w-full max-[820px]:gap-2 max-[820px]:flex-col-reverse">
        <div className="navbar__izq flex lg:flex-row items-center flex-col ml-6">
          <Search />
        </div>

        <div className="navbar__buttons flex flex-row flex-wrap justify-center items-center text-white">
          {/* ----------------------------------------------------------- */}
          <div className="flex flex-row justify-center items-center max-[1130px]:hidden">
            <Link href={'#'}>
              <button className="m-3">Explore</button>
            </Link>
            <Link href="/marketplace">
              <button className="m-3">Marketplace</button>
            </Link>
          </div>
          {/* ----------------------------------------------------------- */}

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
                <p className="m-2 max-xl:hidden font-medium">
                  {session.user.name}
                </p>
                <SvgChevronDown width={'15'} height={'15'} />
              </div>
            ) : (
              <SvgUser width={'25'} height={'25'} />
            )}
          </button>
          {menu && <UserMenuNavBar menu={menu} />}
        </div>
      </div>
    </nav>
  )
}
