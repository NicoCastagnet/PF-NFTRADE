import NavBar from '@components/dashboard/navbar'
import SideBar from '@components/dashboard/sidebar'
import SvgCoin from '@components/icons/svgCoin'
import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { RiVipCrownFill } from 'react-icons/ri'
import useSWR from 'swr'
import styles from '../../styles/form.module.css'

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
        <NavBar />
        <div className="flex justify-center items-center my-10">
          {data
            ? data.nftsOwned.map((e: any) => (
                <div
                  key={e.id}
                  className={`h-[32.5rem] w-[22rem] m-2 overflow-hidden relative flex flex-col rounded-xl p-[1px] cursor-pointer group drop-shadow-lg`}
                >
                  <div
                    className={`h-[32.5rem] w-[22rem] overflow-hidden relative flex flex-col bg-white dark:bg-[#303339] rounded-xl p-[1px] cursor-pointer group`}
                  >
                    <div className="rounded-xl border-spacing-2 h-[20rem]">
                      <Image
                        src={e.image}
                        height={370}
                        width={400}
                        quality={20}
                        alt={`image-${e.name}`}
                        className="rounded-t-xl object-cover group-hover:scale-110 transition duration-300 ease-in-out overflow-auto"
                      />
                    </div>
                    <div className="flex flex-col p-4 h-full w-full justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row w-full justify-between">
                          <h5
                            className={`text-2xl text-gray-800 dark:text-white font-bold truncate ease duration-300`}
                          >
                            {e.name}
                          </h5>
                        </div>
                        <div
                          className={`${styles.description} ease duration-300 text-gray-800 dark:text-white my-4`}
                        >
                          {e.description
                            ? e.description
                            : 'No description provided.'}
                        </div>
                      </div>
                      {/* <p>{e.published ? 'true' : 'false'}</p> */}
                      <div className="flex flex-row justify-between items-center mb-6">
                        <div className="flex flex-row justify-center items-center gap-2 truncate">
                          <span>
                            <RiVipCrownFill className="fill-yellow-500" />
                          </span>
                          <p
                            className={`text-xl text-gray-800 dark:text-white font-semibold  truncate ease duration-300`}
                          >
                            {e.ownerId}
                          </p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <span>
                            <SvgCoin
                              height={20}
                              width={20}
                              className={'fill-gray-800 dark:fill-white'}
                            />
                          </span>
                          <span className="text-gray-800 dark:text-white font-semibold text-xl">
                            {e.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : 'loading'}
        </div>
      </div>
    </section>
  )
}

export default MyNFTS
