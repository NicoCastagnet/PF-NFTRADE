import SvgBell from '@components/icons/svgBell'
import SvgCart from '@components/icons/svgCart'
import SvgCoin from '@components/icons/svgCoin'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

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
            hamburguer &&
            'rotate-45 origin-bottom-left translate-x-[0px]  w-[1.7rem]'
          }  w-[2.2rem]`}
        ></span>
        <span
          className={` bg-white h-1 w-[2.2rem] rounded-full ease duration-100 ${
            hamburguer && 'opacity-0 '
          }`}
        ></span>
        <span
          className={` bg-white h-1  rounded-full ease duration-100 ${
            hamburguer &&
            '-rotate-45 origin-top-left translate-x-[0px] w-[1.7rem]'
          } w-[2.2rem]`}
        ></span>
        <div
          className={`${
            hamburguer && 'translate-x-[-0rem] opacity-100'
          } translate-x-[50rem] opacity-0 fixed top-[5rem] left-0 w-full h-screen ease duration-75 bg-slate-800`}
        >
          <ul className="text-slate-400 text-2xl font-bold w-full flex flex-col items-start px-4">
            {session && (
              <div className="flex justify-center items-center w-full  my-1 px-4 py-2 rounded-lg bg-slate-700  text-center">
                {session?.user.name || session?.user.username}
              </div>
            )}
            {session && (
              <Link href={'#'}>
                <li className="flex flex-row justify-satart items-center gap-4 hover:bg-gray-900 py-2 w-full px-6">
                  <span>
                    <SvgCoin width={'28'} height={'28'} />
                  </span>
                  <span>0</span> coins
                </li>
              </Link>
            )}
            <Link href={'#'}>
              <li className="flex flex-row justify-start items-center gap-4 hover:bg-gray-900 py-2 w-full px-6">
                <span>
                  <SvgCart width={'28'} height={'28'} />
                </span>
                <span>0</span>
                Shopping cart
              </li>
            </Link>
            {session && (
              <Link href={'#'}>
                <li className="flex flex-row justify-start items-center gap-4 hover:bg-gray-900 py-2 w-full px-6">
                  <span>
                    <SvgBell width={'28'} height={'28'} />
                  </span>
                  <span>0</span>
                  Notificaciones
                </li>
              </Link>
            )}
            <Link href={'#'}>
              <li className="flex flex-row justify-start items-center pl-20 gap-4 hover:bg-gray-900 py-2 w-full px-6">
                <span></span> Explore
              </li>
            </Link>
            <Link href={'/marketplace'}>
              <li className="flex flex-row justify-start items-center pl-20 gap-4 hover:bg-gray-900 py-2 w-full px-6">
                <span></span> Marketplace
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Hamburguesa
