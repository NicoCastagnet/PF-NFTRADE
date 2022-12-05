// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Default from '@assets/avataricon.png'
import Cover from '@assets/Cover.webp'
import NavBar from '@components/dashboard/Components/navbar'
import SideBar from '@components/dashboard/Components/sidebar'
import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import useSWR from 'swr'

const Settings: NextPage = () => {
  const { data: session } = useSession()
  const { data } = useSWR(`/api/user/${session?.user.id}`, fetcher)

  return (
    <section className="dashboard__home flex bg-gray-200 dark:bg-[#202225] transition-all">
      <Head>
        <title>NFTrade | Settings</title>
      </Head>
      <SideBar />
      <div className="dashboard__home-content w-screen">
        <NavBar site="Settings" />
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="arriba flex-col">
              <Image
                src={Cover}
                alt="cover"
                className="w-full"
                width={2000}
                height={380}
              />
              <div className="absolute top-52 mx-10 z-50 w-auto h-auto border-4 rounded-full">
                <Image
                  src={session ? session?.user.image : Default}
                  alt={session?.user.id}
                  className="rounded-full bg-white"
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <div className="abajo flex flex-col items-center justify-center">
              <p>Username: {data ? data.email.split('@', 1) : 'loading'}</p>
              <p>Name: {data ? data.name : 'loading'}</p>
              <p>ID: {data ? data.id : 'loading'}</p>
              <p>Email: {data ? data.email : 'loading'}</p>
              <p>Coins: {data ? data.coins : 'loading'}</p>
              <p>Total nfts: {data ? data.nftsOwned.length : 'loading'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Settings
