// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import NFT from '@assets/chain.png'
import SvgLoading from '@components/icons/svgLoading'
import fetcher from '@lib/fetcher'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

const HeaderContainer = () => {
  const { data: session } = useSession()
  const { data: totalUsers } = useSWR(`/api/user`, fetcher)
  const { data: totalNfts } = useSWR(`/api/dashboardata/getAllNfts`, fetcher)
  const { data: totalCollections } = useSWR(
    `/api/dashboardata/getAllCollections`,
    fetcher,
  )
  return (
    <section className="bg-slate-900 dark:bg-[#202225] w-full flex justify-center items-center">
      <div className=" text-white w-full flex justify-between items-center px-14 max-sm:px-6 pt-28 max-sm:pt-24 max-w-7xl py-5 ">
        <div className="flex flex-col justify-center items-start">
          {/* ----------------------------------------------------- */}
          <h1 className="font-black text-7xl max-w-[44rem] max-sm:text-4xl  tracking-wider">
            Explore our
            <br />
            digital{' '}
            <span className="home__title-span font-extrabold text-blue-600">
              NFT
            </span>{' '}
            <br />
            market place.
          </h1>
          {/* ------------------------------------------------------ */}
          <p className="max-w-[39.5rem] max-sm:text-sm my-10">
            Come to know our marketplace. Find the best NFT&apos;s from the
            market at excellent prices! At{' '}
            <span className="text-blue-600 font-bold">NFTrade</span> we provide
            you security and confidence all time.
          </p>
          {/* ------------------------------------------------------ */}
          <div className="flex flex-row justify-start items-center gap-4 pl-3">
            <Link href="/marketplace">
              <a>
                <button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 transition-all font-medium rounded-full text-sm px-9 py-3 text-center max-sm:px-6 max-sm:text-xs"
                >
                  Explore now
                </button>
              </a>
            </Link>

            <Link href={`${session ? '/nfts/create' : '/login'}`}>
              <a>
                <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-full group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white">
                  <span className="relative px-9 py-2.5 transition-all ease-in duration-75 bg-slate-900 dark:bg-[#202225] rounded-full group-hover:bg-opacity-0 max-sm:m-0 max-sm:px-6 max-sm:text-xs">
                    Create NFT
                  </span>
                </button>
              </a>
            </Link>
          </div>
          {/* ------------------------------------------------------ */}

          <div className="flex text-center justify-between w-full max-w-[21rem] mt-8 pl-5">
            <div className="users flex flex-col font-bold text-2xl items-center text-center justify-center">
              {totalUsers ? (
                totalUsers?.length
              ) : (
                <SvgLoading className="animate-spin h-6 w-6" />
              )}
              <span className="mt-1 font-normal text-sm">Users</span>
            </div>
            <div className="NFTS flex flex-col font-bold text-2xl items-center text-center justify-center">
              {totalNfts ? (
                totalNfts?.nfts?.length
              ) : (
                <SvgLoading className="animate-spin h-6 w-6" />
              )}
              <span className="mt-1 font-normal text-sm">Nfts</span>
            </div>
            <div className="collections flex flex-col font-bold text-2xl items-center text-center justify-center">
              {totalCollections ? (
                totalCollections?.collections?.length
              ) : (
                <SvgLoading className="animate-spin h-6 w-6" />
              )}
              <span className="mt-1 font-normal text-sm">Collections</span>
            </div>
          </div>

          {/* ------------------------------------------------------ */}
        </div>
        <div className="left max-[1150px]:hidden">
          <Image src={NFT} alt="nft_img" height={450} width={450} />
        </div>
      </div>
    </section>
  )
}

export default HeaderContainer
