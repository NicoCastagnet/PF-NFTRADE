import AdminBarChart from '@components/charts/adminBarChart'
import AdminPieChart from '@components/charts/adminPieChart'
import AdminTable from '@components/dashboard/adminTable'
import NavBar from '@components/dashboard/navbar'
import SideBar from '@components/dashboard/sidebar'
import UsersTable from '@components/dashboard/usersTable'
import SvgLoading from '@components/icons/svgLoading'
import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import useSWR from 'swr'

const DashBoardWebData: NextPage = () => {
  const { data: session } = useSession()
  const { data } = useSWR(`/api/dashboardata?user=${session?.user.id}`, fetcher)
  const { data: totalUsers } = useSWR(`/api/user`, fetcher)
  const { data: totalNfts } = useSWR(`/api/dashboardata/getAllNfts`, fetcher)
  const { data: totalSales } = useSWR(`/api/dashboardata/admindata`, fetcher)

  console.log(data)

  return (
    <section className="dashboard__home flex bg-gray-200 dark:bg-[#202225] transition-all">
      <Head>
        <title>NFTrade | Admin</title>
      </Head>
      <SideBar />
      <div className="dashboard__home-content w-full flex-row">
        <NavBar site={'Website data'} />
        <div className="dashboard__home-content mx-[5%] my-16 flex flex-col items-center">
          <div className="main-boxes flex justify-center items-center text-center w-full my-5">
            <div className="left flex flex-col bg-[#303339] text-gray-400 rounded-xl w-full p-5 mr-3 drop-shadow-md">
              <span className="text-xl font-bold text-blue-600 flex justify-center">
                {totalUsers ? (
                  totalUsers?.length
                ) : (
                  <SvgLoading className="animate-spin h-6 w-6" />
                )}
              </span>
              <p>Total users</p>
            </div>
            <div className="right flex flex-col bg-[#303339] text-gray-400 rounded-xl w-full p-5 drop-shadow-md">
              <span className="text-xl font-bold text-blue-600 flex justify-center">
                {totalNfts ? (
                  totalNfts?.nfts?.length
                ) : (
                  <SvgLoading className="animate-spin h-6 w-6" />
                )}
              </span>
              <p>Total nfts</p>
            </div>
            <div className="right flex flex-col bg-[#303339] text-gray-400 rounded-xl w-full p-5 ml-3 drop-shadow-md">
              <span className="text-xl font-bold text-blue-600 flex justify-center">
                {totalSales ? (
                  totalSales?.nftData.length
                ) : (
                  <SvgLoading className="animate-spin h-6 w-6" />
                )}
              </span>
              <p>Total sales</p>
            </div>
            <div className="right flex flex-col bg-[#303339] text-gray-400 rounded-xl w-full p-5 ml-3 drop-shadow-md">
              <span className="text-xl font-bold text-blue-600 flex justify-center">
                {totalSales ? (
                  totalSales?.coinsData.length
                ) : (
                  <SvgLoading className="animate-spin h-6 w-6" />
                )}
              </span>
              <p>Total transactions</p>
            </div>
          </div>
          <div className="w-full flex items-center flex-wrap justify-between mt-10">
            <div className="bg-[#303339] rounded-2xl w-[60%] p-2">
              <AdminBarChart userData={data} />
            </div>
            <div className="bg-[#303339] rounded-2xl w-[30%] p-2">
              <AdminPieChart userData={data} />
            </div>
          </div>
          <div className="w-full flex flex-col mt-10">
            <span className="text-center mb-8 text-2xl font-bold text-gray-400">
              Total <span className="text-blue-600">NFT&apos;s</span>
            </span>
            <AdminTable />
          </div>
          <div className="w-full flex flex-col mt-10">
            <span className="text-center mb-8 text-2xl font-bold text-gray-400">
              Total <span className="text-blue-600">User&apos;s</span>
            </span>
            <UsersTable />
          </div>
        </div>
      </div>
    </section>
  )
}

export default DashBoardWebData
