// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import SvgHeart from '@components/icons/svgHeart'
import { filterByPriceAbobeBelow } from '@components/marketplace/filters/filterByPriceAbobeBelow'
import { filterByPriceBetween } from '@components/marketplace/filters/filterByPriceBetwin'
import { orderByLikes } from '@components/marketplace/filters/orderByLikes'
import { orderByName } from '@components/marketplace/filters/orderByName'
import { orderByPrice } from '@components/marketplace/filters/orderByPrice'
import refreshData from '@components/marketplace/filters/refreshData'
import HeaderMarket from '@components/marketplace/headerMarket'
import NavBar from '@components/navbar/navbar'
import fetcher from '@lib/fetcher'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { RiVipCrownFill } from 'react-icons/ri'
import useSWR from 'swr'
import type { NftsResponse } from 'types/api-responses'
import styles from '../styles/form.module.css'

const URL = 'http://localhost:3000/api/nfts'

interface HomeProps {
  fallbackData: NftsResponse
}

const Marketplace: NextPage<HomeProps> = ({ fallbackData }) => {
  const { data: nfts } = useSWR<NftsResponse>(URL, fetcher, {
    fallbackData,
  })

  const { data: session } = useSession()
  const user = session?.user

  const [order, setOrder] = useState('all')
  const [ordered, setOrdered] = useState([])
  const [filter, setFilter] = useState(['none', -1, -1])
  const [carSize, setCardSize] = useState('bigger')

  useEffect(() => {
    try {
      if (order === 'all') {
        refreshData(URL).then((data) => setOrdered(data))
      } else if (order === 'AZ') {
        console.log('az')
        setOrdered(orderByName(ordered, order))
      } else if (order === 'ZA') {
        console.log('za')
        setOrdered(orderByName(ordered, order))
      } else if (order === 'min') {
        console.log('min')
        setOrdered(orderByPrice(ordered, order))
      } else if (order === 'max') {
        console.log('max')
        setOrdered(orderByPrice(ordered, order))
      } else if (order === 'mostLiked') {
        console.log('mostLiked')
        setOrdered(orderByLikes(ordered, order))
      } else if (order === 'lessLiked') {
        console.log('minLiked')
        setOrdered(orderByLikes(ordered, order))
      }

      if (filter[0] === 'above') {
        setOrdered(filterByPriceAbobeBelow(nfts, filter[1], filter[0]))
      } else if (filter[0] === 'below') {
        setOrdered(filterByPriceAbobeBelow(nfts, filter[1], filter[0]))
      } else if (filter[0] === 'between') {
        setOrdered(filterByPriceBetween(nfts, filter[1], filter[2]))
      }
    } catch (e) {
      console.log(e)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

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

  if (!nfts) return <div>loading...</div>
  return (
    <div>
      <Head>
        <title>NFTrade | Marketplace</title>
      </Head>
      <NavBar />
      <HeaderMarket
        setOrder={setOrder}
        setFilter={setFilter}
        setCardSize={setCardSize}
      />
      <section className="market_list relative top-48">
        <div className="market_list-container flex flex-wrap  justify-center w-auto rounded-lg py-6 mb-48 gap-4 min-h-screen">
          {nfts &&
            ordered.map((el) => {
              const likes = el.likedBy.map((acc) => acc.id)
              const likesNum = likes.length

              return (
                <Link href={`/nfts/${el.id}`} key={el.id}>
                  {/* // h-[35rem] w-[22rem] */}
                  <div
                    className={` ${
                      carSize === 'bigger'
                        ? 'h-[35rem] w-[22rem]'
                        : carSize === 'small'
                        ? 'h-[28rem] w-[18rem]'
                        : ''
                    }  relative flex flex-col bg-gray-800 rounded-xl overflow-auto p-[1px] border-slate-900 ease duration-300`}
                  >
                    <div className="rounded-xl border-spacing-2 h-[20rem]">
                      <Image
                        src={el.image}
                        height={carSize === 'small' ? 350 : 370}
                        width={400}
                        quality={20}
                        alt={`image-${el.name}`}
                        className="rounded-t-xl object-cover hover:scale-110 transition duration-300 ease-in-out overflow-auto"
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
                              className="z-[2]"
                            >
                              <SvgHeart
                                className={`${
                                  likes.includes(user?.id) && 'fill-red-600'
                                }`}
                              />
                            </span>
                          </span>
                        </div>
                        <div
                          className={`${styles.description} ${
                            carSize === 'small' ? 'text-sm' : ''
                          } ease duration-300`}
                        >
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Doloribus expedita labore laboriosam iste nihil
                          magnam, quas iusto tenetur rem! Voluptates, quia.
                          Aspernatur doloremque ullam voluptate ea a consectetur
                          reiciendis consequatur?
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
            })}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher(URL)
  return {
    props: { fallbackData: data || {} },
  }
}

export default Marketplace
