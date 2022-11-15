import Collections from '@components/dashboard/admin/collections'
import Nfts from '@components/dashboard/admin/nfts'
import Users from '@components/dashboard/admin/users'
import NavBar from '@components/dashboard/navbar'
import SideBar from '@components/dashboard/sidebar'
import SvgLoading from '@components/icons/svgLoading'
import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

const AdminDashBoard: NextPage = () => {
  const { data: session } = useSession()
  const { data } = useSWR(`/api/dashboardata?user=${session?.user.id}`, fetcher)
  const router = useRouter()

  const [adminData, setAdminData] = useState()

  useEffect(() => {
    async function getData() {
      await fetch('/api/admin/getUsersAndNfts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((r) => setAdminData(r))
    }
    getData()
  }, [])

  const [table, setTable] = useState('users')
  if (data?.admin === false) {
    router.push('/dashboard')
  }

  return (
    <section className="dashboard__home flex bg-gray-200 dark:bg-[#202225] transition-all ">
      <Head>
        <title>NFTrade | Dashboard</title>
      </Head>

      <SideBar />
      <div className="dashboard__home-content w-screen flex-row">
        <NavBar site="Admin" />
        <div className="dashboard__home-content flex flex-col">
          <div className="flex h-[6.9%]">
            <div
              onClick={() => setTable('users')}
              className=" w-1/3 bg-gray-300 flex items-center cursor-pointer hover:bg-neutral-200 hover:shadow-xl shadow-black "
            >
              <div className=" flex justify-center items-end w-full ">
                <p className="text-[1.2rem] font-[600] ">Users</p>
              </div>
            </div>
            <div
              onClick={() => setTable('nfts')}
              className=" w-1/3 bg-gray-300 flex items-center cursor-pointer hover:bg-neutral-200 hover:shadow-xl shadow-black"
            >
              <div className=" flex justify-center items-end w-full ">
                <p className="text-[1.2rem] font-[600] ">Nfts</p>
              </div>
            </div>
            <div
              onClick={() => setTable('collections')}
              className=" w-1/3 bg-gray-300 flex items-center cursor-pointer hover:bg-neutral-200 hover:shadow-xl shadow-black"
            >
              <div className=" flex justify-center items-end w-full ">
                <p className="text-[1.2rem] font-[600] ">Collections</p>
              </div>
            </div>
          </div>
          <div className=" h-full ">
            {data?.admin === false ? (
              <div className="text-center pt-10 underline text-3xl text-red-700">
                Not authorized
              </div>
            ) : data?.admin === undefined ? (
              <div className=" flex justify-center mt-8 ">
                <div className="animate-spin flex justify-center items-center ml-1 w-[28px] h-[28px] rounded-full">
                  <SvgLoading />
                </div>
              </div>
            ) : adminData ? (
              table === 'users' ? (
                <Users data={adminData?.users} />
              ) : table === 'nfts' ? (
                <Nfts data={adminData.nfts} />
              ) : (
                <Collections data={adminData.collections} />
              )
            ) : (
              <div className=" flex justify-center mt-8 ">
                <div className="animate-spin flex justify-center items-center ml-1 w-[28px] h-[28px] rounded-full">
                  <SvgLoading />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdminDashBoard
