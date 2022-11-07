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

const URL = 'http://localhost:3000/api/nfts'

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

  async function likeHandler(nft: NftResponse, likes: string[]) {
    if (likes.includes(user?.id)) {
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
      }),
    })
    refreshStates()
  }

  return (
    <div>
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
        <div className="market_list-container flex flex-wrap  justify-center w-auto rounded-lg py-6 mb-48 gap-4 min-h-screen">
          {isLoading ? (
            <Loading />
          ) : (
            nfts &&
            nfts.map((el) => {
              const likes = el.likedBy.map((acc) => acc.id)
              const likesNum = likes.length

              return (
                <Link href={`/nfts/${el.id}`} key={el.id}>
                  {/* // h-[35rem] w-[22rem] */}
                  <div
                    className={` ${
                      carSize === 'bigger'
                        ? 'h-[35rem] w-[22rem] overflow-hidden'
                        : carSize === 'small'
                        ? 'h-[28rem] w-[18rem] overflow-hidden'
                        : ''
                    }  relative flex flex-col bg-gray-800 rounded-xl overflow-auto p-[1px] border-slate-900 cursor-pointer group`}
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
                    <div className="flex flex-col p-4 h-full w-full justify-between ">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row w-full justify-between">
                          <h5
                            className={`${
                              carSize === 'small' ? 'text-xl' : 'text-2xl'
                            } text-gray-900 dark:text-white font-bold truncate ease duration-300`}
                          >
                            {el.name}
                          </h5>
                          <span className="flex flex-row justify-center items-center gap-2 font-semibold text-white bg-slate-500 rounded-full px-2">
                            <span>{likesNum}</span>
                            <span
                              onClick={() => likeHandler(el, likes)}
                              className=""
                            >
                              <SvgHeart
                                className={`${
                                  likes.includes(user?.id) && 'text-red-600'
                                } w-5 h-5 text-white`}
                              />
                            </span>
                          </span>
                        </div>
                        <div
                          className={`${styles.description} ${
                            carSize === 'small' ? 'text-sm' : ''
                          } ease duration-300 text-white my-4`}
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
                            } text-white font-semibold  truncate ease duration-300`}
                          >
                            {el.owner.name}
                          </p>
                        </div>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <span>
                            <SvgCoin
                              height={20}
                              width={20}
                              className={'fill-white'}
                            />
                          </span>
                          <span className="text-white font-semibold text-xl">
                            {el.price}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <button className={` bg-blue-600 w-[99.5%] rounded-b-xl text-center py-1 z-[3]  font-semibold text-2xl left-0 bottom-0 `}>Buy</button> */}
                  </div>
                </Link>
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
