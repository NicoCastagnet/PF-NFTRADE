// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import AdminBarChart from '@components/dashboard/Charts/adminBarChart'
import AdminPieChart from '@components/dashboard/Charts/adminPieChart'
import NavBar from '@components/dashboard/Components/navbar'
import SideBar from '@components/dashboard/Components/sidebar'
import CollectionsTable from '@components/dashboard/Tables/collectionsDataTable'
import NftsTable from '@components/dashboard/Tables/nftsDataTable'
import UsersTable from '@components/dashboard/Tables/usersDataTable'
import SvgLoading from '@components/icons/svgLoading'
import Loading from '@components/loading'
import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useSWR from 'swr'

const DashBoardWebData: NextPage = () => {
  const { data: session } = useSession()
  const { data } = useSWR(`/api/dashboardata?user=${session?.user.id}`, fetcher)
  const { data: totalUsers } = useSWR(`/api/user`, fetcher)
  const { data: totalNfts } = useSWR(`/api/dashboardata/getAllNfts`, fetcher)
  const { data: totalSales } = useSWR(
    `/api/dashboardata/adminPanelData`,
    fetcher,
  )
  const { data: isAdmin } = useSWR(`/api/user/${session?.user.id}`, fetcher)
  const router = useRouter()

  const [handleTables, setHandleTables] = useState(1)

  if (isAdmin?.admin === false) {
    router.push('/dashboard')
  }

  return (
    <section className="dashboard__home flex bg-gray-200 dark:bg-[#202225] transition-all">
      <Head>
        <title>NFTrade | Admin</title>
      </Head>
      <SideBar />
      <div className="dashboard__home-content w-full flex-row">
        <NavBar site={'Website data'} />
        {isAdmin?.admin === undefined ? (
          <div>LOADER</div>
        ) : isAdmin?.admin === false ? (
          <div>You dont have permission to see this page</div>
        ) : (
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
            {handleTables === 1 ? (
              <div className="w-full flex flex-col mt-10">
                <span className="text-center mb-8 text-2xl font-bold text-gray-400">
                  Total <span className="text-blue-600">NFT&apos;s</span>
                </span>
                <div className="flex border-b border-b-[#202225]">
                  <button
                    className="bg-white hover:bg-gray-300 text-black dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] transition-all rounded-tl-xl w-full p-5"
                    onClick={() => setHandleTables(1)}
                  >
                    Nft&apos;s
                  </button>
                  <button
                    className="bg-white hover:bg-gray-300 text-black dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] transition-all w-full p-5"
                    onClick={() => setHandleTables(2)}
                  >
                    Users
                  </button>
                  <button
                    className="bg-white hover:bg-gray-300 text-black dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] transition-all rounded-tr-xl w-full p-5"
                    onClick={() => setHandleTables(3)}
                  >
                    Collections
                  </button>
                </div>
                <NftsTable />
              </div>
            ) : handleTables === 2 ? (
              <div className="w-full flex flex-col mt-10">
                <span className="text-center mb-8 text-2xl font-bold text-gray-400">
                  Total <span className="text-blue-600">Users</span>
                </span>
                <div className="flex border-b border-b-[#202225]">
                  <button
                    className="bg-white hover:bg-gray-300 text-black dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] transition-all rounded-tl-xl w-full p-5"
                    onClick={() => setHandleTables(1)}
                  >
                    Nft&apos;s
                  </button>
                  <button
                    className="bg-white hover:bg-gray-300 text-black dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] transition-all w-full p-5"
                    onClick={() => setHandleTables(2)}
                  >
                    Users
                  </button>
                  <button
                    className="bg-white hover:bg-gray-300 text-black dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] transition-all rounded-tr-xl w-full p-5"
                    onClick={() => setHandleTables(3)}
                  >
                    Collections
                  </button>
                </div>
                <UsersTable />
              </div>
            ) : handleTables === 3 ? (
              <div className="w-full flex flex-col mt-10">
                <span className="text-center mb-8 text-2xl font-bold text-gray-400">
                  Total <span className="text-blue-600">Collections</span>
                </span>
                <div className="flex border-b border-b-[#202225]">
                  <button
                    className="bg-white hover:bg-gray-300 text-black dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] transition-all rounded-tl-xl w-full p-5"
                    onClick={() => setHandleTables(1)}
                  >
                    Nft&apos;s
                  </button>
                  <button
                    className="bg-white hover:bg-gray-300 text-black dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] transition-all w-full p-5"
                    onClick={() => setHandleTables(2)}
                  >
                    Users
                  </button>
                  <button
                    className="bg-white hover:bg-gray-300 text-black dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] transition-all rounded-tr-xl w-full p-5"
                    onClick={() => setHandleTables(3)}
                  >
                    Collections
                  </button>
                </div>
                <CollectionsTable />
              </div>
            ) : (
              <Loading />
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export default DashBoardWebData
