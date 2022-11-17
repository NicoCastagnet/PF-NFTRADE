import Footer from '@components/footer'
import Loading from '@components/loading'
import Card from '@components/marketplace/card'
import HeaderMarket from '@components/marketplace/headerMarket'
import NavBar from '@components/navbar/navbar'
import useNfts from 'hook/useNfts'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import type { NftsResponse } from 'types/api-responses'

interface HomeProps {
  fallbackData: NftsResponse
}

const Marketplace: NextPage<HomeProps> = () => {
  const [order, setOrder] = useState('')
  const [filter, setFilter] = useState({
    minPrice: '',
    maxPrice: '',
  })

  const { nfts, isLoading } = useNfts(order, filter)
  const [carSize, setCardSize] = useState('bigger')

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
            nfts.map((el) => {
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
          )}
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Marketplace
