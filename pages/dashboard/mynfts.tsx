import NavBar from '@components/dashboard/navbar'
import Nfts from '@components/dashboard/nfts'
import SideBar from '@components/dashboard/sidebar'
import Loading from '@components/loading'
import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import useSWR from 'swr'

const MyNFTS: NextPage = () => {
  const { data: session } = useSession()
  const { data } = useSWR(`/api/user/${session?.user.id}`, fetcher)

  return (
    <section className="dashboard__home flex bg-gray-200 dark:bg-[#202225] transition-all">
      <Head>
        <title>NFTrade | My NFT&apos;s</title>
      </Head>
      <SideBar />
      <div className="dashboard__home-content w-screen">
        <NavBar site="My NFT's" />
        <div className="flex justify-center items-center my-10">
          {data ? (
            data.nftsOwned.map((e: any) => {
              return (
                <Nfts
                  key={e.id}
                  nft={e}
                  id={e.id}
                  image={e.image}
                  name={e.name}
                  published={e.published}
                  price={e.price}
                  views={e.viewedBy.length}
                  likes={e.likedBy.length}
                />
              )
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </section>
  )
}

export default MyNFTS
