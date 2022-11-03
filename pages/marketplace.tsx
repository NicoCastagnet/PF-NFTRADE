// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import SvgHeart from '@components/icons/svgHeart'
import { filterByPriceAbobeBelow } from '@components/marketplace/filters/filterByPriceAbobeBelow'
import { filterByPriceBetween } from '@components/marketplace/filters/filterByPriceBetwin'
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

interface Size {
  margin: string
  width: string
  height: string
  title: string
  titleH: string
  ownerAndPrice: string
  tagsH: string
  positionR: string
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

  useEffect(() => {
    if (order === 'all') {
      refreshData(URL).then((data) => setOrdered(data))
    } else if (order === 'AZ') {
      setOrdered(orderByName(ordered, order))
    } else if (order === 'ZA') {
      setOrdered(orderByName(ordered, order))
    } else if (order === 'min') {
      setOrdered(orderByPrice(ordered, order))
    } else if (order === 'max') {
      setOrdered(orderByPrice(ordered, order))
    }

    if (filter[0] === 'above') {
      setOrdered(filterByPriceAbobeBelow(nfts, filter[1], filter[0]))
    } else if (filter[0] === 'below') {
      setOrdered(filterByPriceAbobeBelow(nfts, filter[1], filter[0]))
    } else if (filter[0] === 'between') {
      setOrdered(filterByPriceBetween(nfts, filter[1], filter[2]))
    }

    console.log(filter, order)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order])

  const [nftSize, setNftSize] = useState<Size>({
    margin: 'm-4',
    width: 'w-[280px]',
    height: 'h-[475px]',
    title: 'text-[1.4rem]',
    titleH: 'max-h-[64px]',
    ownerAndPrice: 'text-[1.1rem]',
    tagsH: 'min-h-[48px]',
    positionR: 'right-[9%]',
  })

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
        setNftSize={setNftSize}
        setFilter={setFilter}
      />
      <section className="market_list relative top-48">
        <div className="market_list-container flex flex-wrap justify-center w-auto rounded-lg mb-48">
          {nfts &&
            ordered.map((e) => {
              const likes = e.likedBy.map((acc) => acc.id)
              const likesNum = likes.length

              return (
                <div key={e.id} className="relative">
                  <div
                    className={`likes flex text-white font-semibold items-center justify-center text-center gap-3 bg-gray-500 rounded-full w-16 h-8 absolute bottom-[31%] ${nftSize.positionR}`}
                  >
                    {likesNum}
                    {user ? (
                      <SvgHeart
                        onClick={() => {
                          likeHandler(e, likes)
                        }}
                        height={20}
                        width={20}
                        className={`${
                          likes.includes(user?.id) && 'fill-green-600'
                        } hover:fill-red-600 transition-all hover:cursor-pointer `}
                      />
                    ) : (
                      <SvgHeart height={20} width={20} />
                    )}
                  </div>
                  <Link href={`/nfts/${e.id}`} key={e.id}>
                    <div
                      className={`market_list-card ${nftSize.width} ${nftSize.height} ${nftSize.margin} rounded-lg border shadow-md bg-gray-800 border-gray-700 cursor-pointer`}
                    >
                      <Image
                        className="rounded-t-lg object-cover hover:scale-110 transition duration-300 ease-in-out"
                        src={e.image}
                        alt="ds"
                        width={400}
                        height={400}
                        quality={20}
                        layout="intrinsic"
                      />

                      <div className="p-[5%]">
                        <div className="title flex flex-row w-[74%]">
                          <a href="#">
                            <h5
                              className={`${nftSize.title} font-bold flex flex-wrap ${nftSize.titleH} tracking-tight text-gray-900 dark:text-white ${styles.nft_title}`}
                            >
                              {e.name}
                            </h5>
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center ">
                        <div
                          className={`text-white ml-[5%] flex flex-wrap w-[71%] ${nftSize.tagsH}`}
                        >
                          {e.categories.map((e) => (
                            <p className="mr-2 " key={e.name}>
                              #{e.name}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div className="px-[5%] pt-[3%]">
                        <div className="owner flex flex-row items-center justify-between">
                          <a href="#" className="flex items-center w-[70%]">
                            <RiVipCrownFill className="fill-yellow-500 mr-2" />
                            <h5
                              className={`${nftSize.ownerAndPrice} font-semibold tracking-tigh text-white ${styles.nft_title}  `}
                            >
                              {e.owner.name}
                            </h5>
                          </a>
                          <div className="flex items-center">
                            <SvgCoin
                              className="fill-white mr-2"
                              width={20}
                              height={20}
                            />
                            <h5
                              className={`${nftSize.ownerAndPrice} font-semibold tracking-tigh text-white`}
                            >
                              {e.price}
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
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
