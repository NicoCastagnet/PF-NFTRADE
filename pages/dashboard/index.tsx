import BarChart from '@components/charts/barchart'
import NavBar from '@components/dashboard/navbar'
import SideBar from '@components/dashboard/sidebar'
import SvgLoading from '@components/icons/svgLoading'
import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import useSWR from 'swr'

const DashBoard: NextPage = () => {
  const { data: session } = useSession()

  const { data } = useSWR(`/api/dashboardata?user=${session?.user.id}`, fetcher)

  return (
    <section className="dashboard__home flex bg-gray-200 dark:bg-[#202225] transition-all">
      <Head>
        <title>NFTrade | Dashboard</title>
      </Head>

      <SideBar />
      <div className="dashboard__home-content w-screen flex-row">
        <NavBar />
        <div className="dashboard__home-content mx-[5%] flex flex-col items-center">

          <h1 className="text-xl m-2">Main stats</h1>
          <div className="main-boxes flex justify-center items-center text-center w-full">
            <div className="left flex flex-col border rounded-xl w-full p-5 m-2">
              <span className="text-xl font-bold text-blue-600 flex justify-center">
                {data ? (
                  data?.staticDashData.sellerCoins
                ) : (
                  <SvgLoading className="animate-spin h-6 w-6" />
                )}
              </span>
              <p>Total coins earned</p>
            </div>
            <div className="right flex flex-col border rounded-xl w-full p-5 m-2">
              <span className="text-xl font-bold text-blue-600 flex justify-center">
                {data ? (
                  data?.staticDashData.sellerSales
                ) : (
                  <SvgLoading className="animate-spin h-6 w-6" />
                )}
              </span>
              <p>Total sales</p>
            </div>
          </div>
          <div className="h-auto w-full py-10">
            <BarChart />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashBoard
