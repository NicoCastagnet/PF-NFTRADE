import whiteLogo from '@assets/White.png'
import SvgCart from '@components/icons/svgCart'
import SvgChevronDown from '@components/icons/svgChevronDown'
import SvgCoin from '@components/icons/svgCoin'
import SvgUser from '@components/icons/svgUser'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import Notificaciones from './notificaciones'
import SerchBar from './serchbar'
import User from './user'

export default function NavBar() {
  const menu = useRef(null)
  const menu2 = useRef(null)
  const { data: session } = useSession()

  function toggleMenu() {
    if (menu?.current.classList.contains('hidden')) {
      menu?.current.classList.remove('hidden')
    } else {
      menu?.current.classList.add('hidden')
    }
  }

  return (
    <nav className="navbar__nav bg-slate-900 w-full flex flex-col lg:flex-row text-center items-center p-2 pl-16 pr-16 justify-between drop-shadow-lg fixed top-0 z-10">
      <div className="navbar__izq flex lg:flex-row items-center flex-col">
        <Link href={'/'}>
          <Image
            src={whiteLogo}
            alt="white_logo"
            height={80}
            width={150}
            className="cursor-pointer"
          />
        </Link>

        <SerchBar />
      </div>
      <div className="navbar__buttons flex flex-row flex-wrap justify-center items-center text-white">
        <button className="m-3">Explore</button>
        <Link href="/marketplace">
          <button className="m-3">Marketplace</button>
        </Link>
        {session && <SvgCoin className="m-3" width={'25'} height={'25'} />}
        <SvgCart className="m-3" width={'25'} height={'25'} />

        {session && <Notificaciones />}

        <button
          id="dropdownInformationButton"
          data-dropdown-toggle="dropdownInformation"
          className="relative m-3"
          type="button"
          onClick={toggleMenu}
          ref={menu2}
        >
          {session && session.user.image ? (
            <div className="flex items-center hover:text-blue-600">
              <Image
                src={session.user.image}
                alt="user_image"
                height={35}
                width={35}
                className="rounded-full"
              />
              <p className="m-2 font-medium">{session.user.name}</p>
              <SvgChevronDown width={'15'} height={'15'} />
            </div>
          ) : (
            <SvgUser width={'25'} height={'25'} />
          )}
        </button>

        <User menu={menu} />
      </div>
    </nav>
  )
}
