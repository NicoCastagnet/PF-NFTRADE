// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import SvgHeart from '@components/icons/svgHeart'
import Loading from '@components/loading'
import HeaderMarket from '@components/marketplace/headerMarket'
import NavBar from '@components/navbar/navbar'
import fetcher from '@lib/fetcher'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { RiVipCrownFill } from 'react-icons/ri'
import useSWR from 'swr'
import type { NftsResponse } from 'types/api-responses'
import styles from '../styles/form.module.css'

const URL = '/api/nfts'

interface HomeProps {
  fallbackData: NftsResponse
}

const useNfts = (order = '', { minPrice, maxPrice }) => {
  const { data: nfts, error } = useSWR<NftsResponse>(
    [URL, `?order=${order}&minPrice=${minPrice}&maxPrice=${maxPrice}`],
    fetcher,
  )

  return {
    nfts,
    isLoading: !error && !nfts,
    error,
  }
}

const Marketplace: NextPage<HomeProps> = () => {
  const [order, setOrder] = useState('')
  const [filter, setFilter] = useState({
    minPrice: '',
    maxPrice: '',
  })
  const { nfts, isLoading } = useNfts(order, filter)

  const { data: session } = useSession()
  const user = session?.user

  const [carSize, setCardSize] = useState('bigger')

  const [reload, setReload] = useState(false)

  function refreshStates() {
    if (reload === false) {
      setReload(true)
    } else {
      setReload(false)
    }
  }

  let isLiked

  async function likeHandler(nft: NftResponse, likes: string[]) {
    if (likes.includes(user?.id)) {
      isLiked = true
      likes = likes.filter((id) => id !== user?.id)
      nft.likedBy.pop()
    } else {
      likes = likes.push(user?.id)
      nft.likedBy.push({ id: user?.id })
    }
    fetch('/api/put/nftLike', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.id,
        nftId: nft.id,
        isLiked: isLiked || false,
      }),
    })
    refreshStates()
  }

  return (
    <div className="bg-gray-200 dark:bg-[#202225]">
      <Head>
        <title>NFTrade | Marketplace</title>
      </Head>
      <NavBar />
      <HeaderMarket
        setOrder={setOrder}
        filterValues={filter}
        setFilter={setFilter}
        setCardSize={setCardSize}
      />
      <section className="market_list relative top-48">
        <div className="market_list-container flex flex-wrap justify-center w-auto rounded-lg py-6 mb-48 gap-4 min-h-screen">
          {isLoading ? (
            <Loading />
          ) : (
            nfts &&
            nfts.map((el) => {
              const likes = el.likedBy.map((acc) => acc.id)
              const likesNum = likes.length

              return (
                <div
                  key={el.id}
                  className={` ${
                    carSize === 'bigger'
                      ? 'h-[32.5rem] w-[22rem] overflow-hidden'
                      : carSize === 'small'
                      ? 'h-[27.5rem] w-[18rem] overflow-hidden'
                      : ''
                  }  relative flex flex-col rounded-xl overflow-auto p-[1px] cursor-pointer group drop-shadow-lg`}
                >
                  {user ? (
                    <span className="flex flex-row justify-center items-center gap-2 font-semibold text-white bg-slate-500 rounded-full px-2 absolute top-2 right-2 z-[1]">
                      <span className="pl-1">{likesNum}</span>
                      <span onClick={() => likeHandler(el, likes)}>
                        <SvgHeart
                          className={`${
                            likes.includes(user?.id) && 'text-red-600'
                          } w-6 h-7 text-white hover:text-green-600`}
                        />
                      </span>
                    </span>
                  ) : (
                    <>
                      <span className="cursor-not-allowed flex flex-row justify-center items-center gap-2 font-semibold text-white bg-slate-500 rounded-full px-2 absolute top-2 right-2 z-[1]">
                        <span className="pl-1">{likesNum}</span>
                        <span>
                          <SvgHeart className={`w-6 h-7 text-white`} />
                        </span>
                      </span>
                    </>
                  )}

                  <Link href={`/nfts/${el.id}`} key={el.id}>
                    <div
                      className={` ${
                        carSize === 'bigger'
                          ? 'h-[32.5rem] w-[22rem] overflow-hidden'
                          : carSize === 'small'
                          ? 'h-[27.5rem] w-[18rem] overflow-hidden'
                          : ''
                      }  relative flex flex-col bg-white dark:bg-[#303339] rounded-xl overflow-auto p-[1px] cursor-pointer group`}
                    >
                      <div className="rounded-xl border-spacing-2 h-[20rem]">
                        <Image
                          src={el.image}
                          height={carSize === 'small' ? 350 : 370}
                          width={400}
                          quality={20}
                          alt={`image-${el.name}`}
                          className="rounded-t-xl object-cover group-hover:scale-110 transition duration-300 ease-in-out overflow-auto"
                        />
                      </div>
                      <div className="flex flex-col p-4 h-full w-full justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex flex-row w-full justify-between">
                            <h5
                              className={`${
                                carSize === 'small' ? 'text-xl' : 'text-2xl'
                              } text-gray-800 dark:text-white font-bold truncate ease duration-300`}
                            >
                              {el.name}
                            </h5>
                          </div>
                          <div
                            className={`${styles.description} ${
                              carSize === 'small' ? 'text-sm' : ''
                            } ease duration-300 text-gray-800 dark:text-white my-4`}
                          >
                            {el.description
                              ? el.description
                              : 'No description provided.'}
                          </div>
                        </div>
                        <div className="flex flex-row justify-between items-center mb-6">
                          <div className="flex flex-row justify-center items-center gap-2 truncate">
                            <span>
                              <RiVipCrownFill className="fill-yellow-500" />
                            </span>
                            <p
                              className={`${
                                carSize === 'small' ? 'text-base' : 'text-xl'
                              } text-gray-800 dark:text-white font-semibold  truncate ease duration-300`}
                            >
                              {el.owner.name}
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
                              {el.price}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        className={`translate-y-10 group-hover:translate-y-0 transition-all absolute bg-blue-600 w-full rounded-b-xl text-center py-2 z-[3] font-semibold text-1xl left-0 bottom-0`}
                      >
                        Add to cart
                      </button>
                    </div>
                  </Link>
                </div>
              )
            })
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Marketplace
