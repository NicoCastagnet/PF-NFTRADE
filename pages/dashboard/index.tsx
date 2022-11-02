import Logo from '@assets/White.png'
import SvgBox from '@components/icons/svgBox'
import SvgChartBar from '@components/icons/svgChartBar'
import SvgChartPie from '@components/icons/svgChartPie'
import SvgChevronDown from '@components/icons/svgChevronDown'
import SvgHome from '@components/icons/svgHome'
import SvgLogOut from '@components/icons/svgLogOut'
import SvgSettings from '@components/icons/svgSettings'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

const DashBoard: NextPage = () => {
  return (
    <section className="dashboard__home flex">
      <Head>
        <title>NFTrade | Dashboard</title>
      </Head>
      <div className="dashboard__home-sidebar z-40 h-screen w-64 px-4 overflow-y-auto bg-gray-800">
        <Image src={Logo} alt="Logo" height={90} width={160} />
        <div className="dashboard__home-sidebar-list overflow-y-auto">
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
            <Link href="#">
              <li className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 cursor-pointer">
                <SvgBox className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="ml-3">My NFT&apos;s</span>
              </li>
            </Link>
            <Link href="#">
              <li className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 cursor-pointer">
                <SvgSettings className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="ml-3">Settings</span>
              </li>
            </Link>
            <Link href="#">
              <li className="flex items-center p-2 text-base font-normal rounded-lg text-white hover:bg-gray-700 cursor-pointer">
                <SvgLogOut className="w-6 h-6 transition duration-75 text-gray-400 group-hover:text-white" />
                <span className="ml-3">Log out</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="dashboard__home-content w-screen flex-row">
        <div className="dashboard__home-nav">
          <nav className="flex px-5 py-5 text-gray-700 bg-gray-800 border-gray-700">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link href="#">
                  <div className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-white cursor-pointer">
                    <SvgChartBar className="w-4 h-4 mr-2" />
                    Dashboard
                  </div>
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <SvgChevronDown className="w-6 h-6 text-gray-400 -rotate-90" />
                  <p className="ml-1 text-sm font-medium md:ml-2 text-gray-400">
                    Home
                  </p>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="dashboard__home-content p-16">
          <h1 className="text-xl m-2">Main stats</h1>
          <div className="main-boxes flex justify-center items-center text-center">
            <div className="left flex flex-col border rounded-xl w-full p-5 m-2">
              <span className="text-xl font-bold text-blue-600">$0,00</span>
              <p>Total billing</p>
            </div>
            <div className="right flex flex-col border rounded-xl w-full p-5 m-2">
              <span className="text-xl font-bold text-blue-600">0</span>
              <p>Total sales</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashBoard
