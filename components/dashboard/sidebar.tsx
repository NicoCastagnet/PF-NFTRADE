import Logo from '@assets/White.png'
import SvgBox from '@components/icons/svgBox'
import SvgChartPie from '@components/icons/svgChartPie'
import SvgHome from '@components/icons/svgHome'
import SvgLogOut from '@components/icons/svgLogOut'
import SvgSettings from '@components/icons/svgSettings'
import SvgWarning from '@components/icons/svgWarning'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const SideBar: NextPage = () => {
  const [admin, setAdmin] = useState(false)

  const { data: session } = useSession()

  useEffect(() => {
    async function getAdmin() {
      await fetch(`/api/user/${session?.user.id}/getIsAdmin/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((r) => setAdmin(r))
    }
    getAdmin()
  }, [])

  return (
    <div className="dashboard__home-sidebar z-40 h-screen w-64 px-4 overflow-y-auto bg-gray-200 text-gray-600 dark:text-gray-400 border-r border-r-gray-400 dark:border-r-gray-600 dark:bg-[#202225] transition-all">
      <Link className=" cursor-pointer " href={'/'}>
        <Image
          className=" cursor-pointer "
          src={Logo}
          alt="Logo"
          height={350}
          width={580}
        />
      </Link>
      <div className="dashboard__home-sidebar-list overflow-y-auto">
        <ul className="space-y-2">
          <Link href="/dashboard">
            <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
              <SvgHome className="w-6 h-6 transition duration-75" />
              <span className="ml-3">Home</span>
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
              <SvgChartPie className="w-6 h-6 transition duration-75" />
              <span className="ml-3">Statistics</span>
            </li>
          </Link>
          <Link href="dashboard/mynfts">
            <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
              <SvgBox className="w-6 h-6 transition duration-75" />
              <span className="ml-3">My NFT&apos;s</span>
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
              <SvgSettings className="w-6 h-6 transition duration-75" />
              <span className="ml-3">Settings</span>
            </li>
          </Link>
          <Link href="#">
            <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
              <SvgLogOut className="w-6 h-6 transition duration-75" />
              <span className="ml-3">Log out</span>
            </li>
          </Link>
          {admin === true && (
            <Link href="/dashboard/admindash">
              <li className="flex items-center p-2 text-base font-normal rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-[#393b41] cursor-pointer transition-all">
                <SvgWarning className=" fill-orange-400 w-6 h-6 transition duration-75" />
                <span className="ml-3">Admin</span>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  )
}

export default SideBar
