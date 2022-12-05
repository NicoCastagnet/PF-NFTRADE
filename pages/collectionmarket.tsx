// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Footer from '@components/footer'
import Loading from '@components/loading'
import CollectionCard from '@components/marketplace/collectionCard'
import HeaderMarket from '@components/marketplace/headerMarket'
import NavBar from '@components/navbar/navbar'
import useCollections from 'hook/useCollections'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import type { NftsResponse } from 'types/api-responses'

interface HomeProps {
  fallbackData: NftsResponse
}

const CollectionMarket: NextPage<HomeProps> = () => {
  const [order, setOrder] = useState('')
  const [filter, setFilter] = useState({
    minPrice: 0,
    maxPrice: 99999,
  })

  const { collections, isLoading } = useCollections(order, filter)
  const [carSize, setCardSize] = useState('bigger')

  console.log(collections)

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
            collections &&
            collections.map((el) => {
              return (
                <CollectionCard
                  nft={el}
                  key={el.id}
                  id={el.id}
                  carSize={carSize}
                  name={el.name}
                  owner={el.owner}
                  price={el.price}
                  image={el.image}
                  description={el.description}
                  likedBy={[]}
                />
              )
            })
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default CollectionMarket
