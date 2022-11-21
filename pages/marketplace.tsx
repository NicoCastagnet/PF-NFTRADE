// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Footer from '@components/footer'
import Loading from '@components/loading'
import Card from '@components/marketplace/card'
import HeaderMarket from '@components/marketplace/headerMarket'
import NavBar from '@components/navbar/navbar'
import useNftInfiniteScroll from '@hook/useNftInfinite'
import { getAllNfts } from '@lib/api'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import type { NftResponse, NftsResponse } from 'types/api-responses'

interface HomeProps {
  fallbackData: NftsResponse
}

const Marketplace: NextPage<HomeProps> = ({ fallbackData }) => {
  const externalRef = useRef()
  const [order, setOrder] = useState('')
  const [filter, setFilter] = useState({
    minPrice: '',
    maxPrice: '',
  })

  const { nfts, isLoading } = useNftInfiniteScroll(
    order,
    filter,
    fallbackData,
    externalRef,
  )
  const [carSize, setCardSize] = useState('bigger')

  console.log('🚀 ~ file: marketplace.tsx ~ line 29 ~ nfts', nfts)
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
      <section className="market_list relative sm:top-48 top-32">
        <div className="market_list-container flex flex-wrap justify-center w-auto rounded-lg py-6 mb-48 gap-4 min-h-screen">
          {isLoading ? (
            <Loading />
          ) : (
            nfts &&
            nfts.map((nft) => {
              return nft.map((el: NftResponse) => {
                return (
                  <Card
                    nft={el}
                    key={el.id}
                    id={el.id}
                    carSize={carSize}
                    name={el.name}
                    likedBy={el.likedBy}
                    owner={el.owner}
                    price={el.price}
                    image={el.image}
                    description={el.description}
                  />
                )
              })
            })
          )}
        </div>
      </section>
      <span id="observer" ref={externalRef}></span>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getAllNfts({ page: 1, limit: 6 })
  return {
    props: {
      nfts: data,
    },
  }
}

export default Marketplace
