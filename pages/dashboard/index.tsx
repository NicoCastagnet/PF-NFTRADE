// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Cry from '@assets/cry.webp'
import BarChart from '@components/charts/barchart'
import PieChart from '@components/charts/pieChart'
import NavBar from '@components/dashboard/Components/navbar'
import SideBar from '@components/dashboard/Components/sidebar'
import UserTable from '@components/dashboard/Tables/userTable'
import SvgLoading from '@components/icons/svgLoading'
import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'
import styles from '../../styles/wavinghand.module.css'

const DashBoard: NextPage = () => {
  const { data: session } = useSession()
  const { data } = useSWR(`/api/dashboardata?user=${session?.user.id}`, fetcher)
  const { data: userCoins } = useSWR(`/api/user/${session?.user.id}`, fetcher)
  return (
    <section className="dashboard__home flex bg-gray-200 dark:bg-[#202225] transition-all">
      <Head>
        <title>NFTrade | Dashboard</title>
      </Head>
      <SideBar />
      <div className="dashboard__home-content w-full flex-row">
        <NavBar site={'Home'} />
        <div className="dashboard__home-content mx-[5%] my-16 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2">
            <span className={`text-4xl ${styles.wave}`}>👋</span>
            <h1 className="text-3xl font-bold my-5 text-gray-400">
              Welcome {session?.user.name}!
            </h1>
          </div>
          <div className="main-boxes flex justify-center items-center text-center w-full">
            <div className="left flex flex-col bg-[#303339] text-gray-400 rounded-xl w-full p-5 mr-3 drop-shadow-md">
              <span className="text-xl font-bold text-blue-600 flex justify-center">
                {data ? (
                  data?.staticDashData.sellerCoins
                ) : (
                  <SvgLoading className="animate-spin h-6 w-6" />
                )}
              </span>
              <p>Total coins earned</p>
            </div>
            <div className="right flex flex-col bg-[#303339] text-gray-400 rounded-xl w-full p-5 drop-shadow-md">
              <span className="text-xl font-bold text-blue-600 flex justify-center">
                {data ? (
                  data?.staticDashData.sellerSales
                ) : (
                  <SvgLoading className="animate-spin h-6 w-6" />
                )}
              </span>
              <p>Total sales</p>
            </div>
            <div className="right flex flex-col bg-[#303339] text-gray-400 rounded-xl w-full p-5 ml-3 drop-shadow-md">
              <span className="text-xl font-bold text-blue-600 flex justify-center">
                {userCoins ? (
                  parseInt(userCoins?.coins).toLocaleString('es-AR')
                ) : (
                  <SvgLoading className="animate-spin h-6 w-6" />
                )}
              </span>
              <p>My coins</p>
            </div>
          </div>
          <div className="w-full flex items-center flex-wrap justify-between mt-10">
            <div className="bg-[#303339] rounded-2xl w-[60%] p-2">
              <BarChart userData={data} />
            </div>
            {data?.userSells.approved === 0 ? (
              <div className="flex flex-col items-center justify-center bg-[#303339] rounded-2xl w-[30%] h-[46.7vh]">
                <div className="w-48">
                  <Image src={Cry} alt="cry" />
                </div>
                <span className="text-gray-400 px-5 font-semibold text-lg text-center">
                  You haven&apos;t bought any coin yet! Buy them and start
                  exploring our website.
                </span>
                <Link href="/buy">
                  <a>
                    <button className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#393b41] dark:hover:bg-[#4c4e53] transition-all text-lg font-semibold w-full h-10 mt-5 px-5 rounded-lg">
                      Buy coins now!
                    </button>
                  </a>
                </Link>
              </div>
            ) : (
              <div className="bg-[#303339] rounded-2xl w-[30%] p-2">
                <PieChart userData={data} />
              </div>
            )}
          </div>
          <div className="w-full flex flex-col mt-10">
            <span className="text-center mb-8 text-2xl font-bold text-gray-400">
              Your <span className="text-blue-600">NFT&apos;s</span>
            </span>
            <UserTable />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashBoard
