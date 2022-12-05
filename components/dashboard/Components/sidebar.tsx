// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Logo from '@assets/White.png'
import SvgAdmin from '@components/icons/svgAdmin'
import SvgBell from '@components/icons/svgBell'
import SvgBox from '@components/icons/svgBox'
import SvgCart from '@components/icons/svgCart'
import SvgHome from '@components/icons/svgHome'
import SvgLogOut from '@components/icons/svgLogOut'
import NotifyDashboard from '@components/navbar/notify/notifyDashBoard'
import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'

const SideBar: NextPage = () => {
  const { data: session } = useSession()
  const [openNotify, setOpenNotify] = useState(false)
  const router = useRouter()
  const URL = `/api/notificaciones?user=${session?.user.id}`
  const { data } = useSWR(URL, fetcher, { refreshInterval: 1000 })
  const { data: adminData } = useSWR(`/api/user/${session?.user.id}`, fetcher)

  return (
    <div className="dashboard__home-sidebar z-40 h-auto w-64 px-4 overflow-y-auto bg-gray-200 text-gray-600 dark:text-gray-400 border-r border-r-gray-400 dark:border-r-gray-600 dark:bg-[#202225] transition-all">
      <div className="dashboard__home-sidebar-list overflow-y-auto fixed">
        <Link href={'/'}>
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="Logo"
            height={120}
            width={190}
          />
        </Link>
        <ul className="space-y-2">
          <Link href="/dashboard">
            <a>
              <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
                <SvgHome className="w-6 h-6 transition duration-75" />
                <span className="ml-3">Home</span>
              </li>
            </a>
          </Link>
          <Link href="dashboard/mynfts">
            <a>
              <li className="flex items-center p-2 mt-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
                <SvgBox className="w-6 h-6 transition duration-75" />
                <span className="ml-3">My NFT&apos;s</span>
              </li>
            </a>
          </Link>
          <li
            className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all"
            onClick={() => setOpenNotify(!openNotify)}
          >
            <SvgBell className="w-6 h-6 transition duration-75" />

            {data?.total ? (
              <div>
                <span className="h-4 w-4 bg-red-500 rounded-full absolute left-1 top-56 text-white font-bold text-xs text-center flex justify-center items-center ">
                  {data?.total}
                </span>
                <span className="animate-ping h-4 w-4 bg-red-500 rounded-full inline-flex absolute left-1 top-56" />
              </div>
            ) : (
              <></>
            )}
            <span className="ml-3">Notifications</span>
          </li>
          <Link href="/buy">
            <a>
              <li className="flex items-center p-2 mt-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
                <SvgCart className="w-6 h-6 transition duration-75" />
                <span className="ml-3">Buy coins</span>
              </li>
            </a>
          </Link>
          {adminData?.admin && (
            <Link href="/dashboard/webdata">
              <a>
                <li className="flex items-center p-2 mt-2 text-base font-normal rounded-lg hover:text-orange-400 dark:hover:text-orange-400 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
                  <SvgAdmin className="w-6 h-6 transition duration-75" />
                  <span className="ml-3">Website data</span>
                </li>
              </a>
            </Link>
          )}
          <li
            className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all"
            onClick={async () => {
              await signOut()
              router.push('/')
            }}
          >
            <SvgLogOut className="w-6 h-6 transition duration-75" />
            <span className="ml-3">Log out</span>
          </li>
        </ul>
      </div>
      <NotifyDashboard
        isOpen={openNotify}
        handleClose={setOpenNotify}
        data={data}
      />
    </div>
  )
}

export default SideBar
