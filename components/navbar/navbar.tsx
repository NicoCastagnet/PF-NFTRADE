// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import whiteLogo from '@assets/White.png'
import SvgBell from '@components/icons/svgBell'
import SvgCart from '@components/icons/svgCart'
import SvgChevronDown from '@components/icons/svgChevronDown'
import SvgCoin from '@components/icons/svgCoin'
import SvgUser from '@components/icons/svgUser'
import Search from '@components/search'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import styles from '../../styles/form.module.css'

export default function NavBar() {
  const menu = useRef(null)
  const menu2 = useRef(null)
  const { data: session } = useSession()
  const router = useRouter()

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
        <Search />
      </div>
      <div className="navbar__buttons flex flex-row flex-wrap justify-center items-center text-white">
        <button className="m-3">Explore</button>
        <Link href="/marketplace">
          <button className="m-3">Marketplace</button>
        </Link>
        {session && <SvgCoin className="m-3" width={'25'} height={'25'} />}
        <SvgCart className="m-3" width={'25'} height={'25'} />

        {session && (
          <button>
            <span className="h-4 w-4 bg-red-500 rounded-full inline-flex absolute top-[1.80rem] border-[3px] border-gray-900 z-10"></span>
            <span className="animate-ping h-4 w-4 bg-red-500 rounded-full inline-flex absolute top-[1.80rem] z-10"></span>
            <SvgBell
              className={`m-3 ${styles.bell}`}
              width={'25'}
              height={'25'}
            />
          </button>
        )}

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

        {session ? (
          <div
            id="dropdownInformation"
            ref={menu}
            className={`relative ${styles.menu}`}
          >
            <div
              className={` z-10 w-44 shadow bg-gray-700 divide-gray-600 absolute top-9 right-5 rounded-xl `}
            >
              <div className="py-3 px-4 text-sm text-white hover:bg-gray-600 hover:rounded-t-xl">
                {/* <div>
                {session?.user.name || session?.user.email.split('@')[0]}
              </div> */}
                <div className="font-medium truncate">
                  {session?.user.email}
                </div>
              </div>
              <ul
                className="py-1 text-sm text-gray-200 border-y-white border-y-2"
                aria-labelledby="dropdownInformationButton"
              >
                <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white">
                  <a href="#">Dashboard</a>
                </li>
                <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white">
                  <a href="#">Settings</a>
                </li>
              </ul>
              <div
                className="block py-3 px-4 text-sm hover:bg-gray-600 hover:rounded-b-xl text-gray-200 hover:text-white"
                onClick={async () => {
                  await signOut()
                }}
              >
                <a href="#">Sign out</a>
              </div>
            </div>
          </div>
        ) : (
          <div
            id="dropdownInformation"
            ref={menu}
            className="hidden z-10 w-44 rounded divide-y shadow bg-gray-700 divide-gray-600 absolute top-[5.5rem] right-[3rem]"
          >
            <div className="py-3 px-4 text-sm text-white">
              <div>Welcome user!</div>
              <div className="font-medium truncate">{session?.user.email}</div>
            </div>
            <ul
              className="py-1 text-sm text-gray-200"
              aria-labelledby="dropdownInformationButton"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
                  onClick={() => {
                    router.push('/logIn')
                  }}
                >
                  Log in
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
                  onClick={() => {
                    router.push('/signIn')
                  }}
                >
                  Register
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
