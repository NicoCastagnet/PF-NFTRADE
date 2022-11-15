import NavBar from '@components/dashboard/navbar'
import SideBar from '@components/dashboard/sidebar'
import SvgNewTab from '@components/icons/svgNewTab'
import SvgTrash from '@components/icons/svgTrash'
import Loading from '@components/loading'
import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
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
            data.nftsOwned.map((e: any) => (
              <div
                key={e.id}
                className={`h-auto w-[22rem] m-2 overflow-hidden relative flex flex-col rounded-xl p-[1px] cursor-pointer group drop-shadow-lg`}
              >
                <div
                  className={`h-auto w-[22rem] overflow-hidden relative flex flex-col bg-white dark:bg-[#303339] rounded-xl p-[1px] cursor-pointer group`}
                >
                  <SvgTrash className="absolute z-50 h-6 w-6 left-[19.5rem] m-2 dark:fill-[#979797] dark:hover:fill-red-600 transition-all" />
                  <a
                    href={`http://localhost:3000/nfts/${e.id}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SvgNewTab className="absolute z-50 h-5 w-5 m-2 dark:fill-[#979797] dark:hover:fill-blue-600 transition-all" />
                  </a>
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
                      <button className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#393b41] dark:hover:bg-[#4c4e53] transition-all text-lg font-semibold w-full h-10 my-1">
                        Click to{' '}
                        {e.published
                          ? 'remove the nft from market'
                          : 'publish the nft'}
                      </button>
                      <button className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#393b41] dark:hover:bg-[#4c4e53] transition-all text-lg font-semibold w-full h-10 my-1">
                        <p>
                          NFT price:{' '}
                          <input
                            className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#4c4e53] dark:hover:bg-[#393b41] text-lg text-center font-semibold w-20 rounded-md mx-1 transition-all outline-none focus:outline-none"
                            type="number"
                            placeholder={e.price}
                          />
                        </p>
                      </button>
                    </div>
                    <div className="flex flex-row justify-between items-center text-lg text-gray-800 dark:text-white font-semibold mt-2">
                      <div className="flex flex-row justify-center items-center gap-2 ">
                        <p>NFT Views: </p>
                        <span>{e.viewedBy.length}</span>
                      </div>
                      <div className="flex flex-row justify-center items-center gap-2">
                        <p>NFT Likes: </p>
                        <span>{e.likedBy.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </section>
  )
}

export default MyNFTS
