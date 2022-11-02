import Logo from '@assets/White.png'
import SvgBox from '@components/icons/svgBox'
import SvgChartPie from '@components/icons/svgChartPie'
import SvgHome from '@components/icons/svgHome'
import SvgLogOut from '@components/icons/svgLogOut'
import SvgSettings from '@components/icons/svgSettings'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const DashBoardStatistics: NextPage = () => {
  return (
    <section className="flex">
      <Head>
        <title>Dashboard | Statistics</title>
      </Head>
      <div className="left z-40 h-screen w-64 p-4 overflow-y-auto bg-gray-800">
        <Image src={Logo} alt="Logo" height={90} width={160} />
        <div className="overflow-y-auto">
          <ul className="space-y-2">
            <Link href="/dashboard">
              <li className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 cursor-pointer">
                <SvgHome className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="ml-3">Home</span>
              </li>
            </Link>
            <Link href="#">
              <li className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 cursor-pointer">
                <SvgChartPie className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="ml-3">Statistics</span>
              </li>
            </Link>
            <Link href="../mynfts">
              <li className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 cursor-pointer">
                <SvgBox className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="ml-3">My NFT&apos;s</span>
              </li>
            </Link>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700"
              >
                <SvgSettings className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />

                <span className="flex-1 ml-3 whitespace-nowrap">Settings</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700"
              >
                <SvgLogOut className="flex-shrink-0 w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="righ">
        <h1>This is the statistics right side</h1>
      </div>
    </section>
  )
}

export default DashBoardStatistics
