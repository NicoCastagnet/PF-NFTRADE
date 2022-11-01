import Footer from '@components/footer'
import SvgHeart from '@components/icons/svgHeart'
import HeaderMarket from '@components/marketplace/headerMarket'
import NavBar from '@components/navbar/navbar'
import fetcher from '@lib/fetcher'
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { RiVipCrownFill } from 'react-icons/ri'
import useSWR from 'swr'
import type { NftResponse, NftsResponse } from 'types/api-responses'
import SvgCoin from '../components/icons/svgCoin'
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

  const [nftSize, setNftSize] = useState<Size>({
    margin: 'm-10',
    width: 'w-[350px]',
    height: 'h-[565px]',
    title: 'text-2xl',
    titleH: 'min-h-[64px]',
    ownerAndPrice: 'text-xl',
    tagsH: 'min-h-[48px]',
    positionR: 'right-[13%]',
  })

  console.log(nftSize)

  if (!nfts) return <div>loading...</div>

  function likeHandler(e: NftResponse) {
    console.log(e)
    // este seria el codigo para setear los likes, una vez terminado habria que hacer un put al nft likeado
    // if (e.likedBy.includes(userAccount)) {
    //   e.likedBy.filter(acc => acc !== userAccount)
    // }else{
    //   e.likedBy.push(userAccount)
    // }
  }

  return (
    <div>
      <NavBar />
      <HeaderMarket setNftSize={setNftSize} />
      <section className="market_list relative top-48">
        <div className="market_list-container flex flex-wrap justify-center w-auto rounded-lg mb-48">
          {nfts &&
            nfts.map((e) => {
              return (
                <div key={e.id} className="relative">
                  <div
                    className={`likes flex text-white font-semibold items-center justify-center text-center gap-3 bg-gray-500 rounded-full w-16 h-8 absolute bottom-[31%] ${nftSize.positionR}`}
                  >
                    {e._count.likedBy}
                    <SvgHeart
                      onClick={() => {
                        likeHandler(e)
                      }}
                      height={20}
                      width={20}
                      className="hover:fill-red-600 transition-all hover:cursor-pointer"
                    />
                  </div>
                  <Link href={`/nfts/${e.id}`} key={e.id}>
                    <div
                      className={`market_list-card ${nftSize.width} ${nftSize.height} ${nftSize.margin} rounded-lg border shadow-md bg-gray-800 border-gray-700 cursor-pointer`}
                    >
                      <Image
                        className="rounded-t-lg"
                        src={e.image}
                        alt="ds"
                        width={1000}
                        height={1000}
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
