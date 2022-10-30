import Footer from '@components/footer'
import SvgChevron from '@components/icons/svgChevronDown'
import SvgGrid2 from '@components/icons/svgGrid2'
import SvgHeart from '@components/icons/svgHeart'
import SvgList2 from '@components/icons/svgList2'
import NavBar from '@components/navbar/navbar'
import fetcher from '@lib/fetcher'
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { RiVipCrownFill } from 'react-icons/ri'
import useSWR from 'swr'
import type { NftsResponse } from 'types/api-responses'
import SvgCoin from '../components/icons/svgCoin'
import SvgGrid3 from '../components/icons/svgGrid3'
import styles from '../styles/form.module.css'

const URL = 'http://localhost:3000/api/nfts'

interface HomeProps {
  fallbackData: NftsResponse
}

const Marketplace: NextPage<HomeProps> = ({ fallbackData }) => {
  const { data: nfts } = useSWR<NftsResponse>(URL, fetcher, {
    fallbackData,
  })

  if (!nfts) return <div>loading...</div>

  return (
    <div>
      <NavBar />
      <section className="market__header bg-slate-900 text-white py-1 px-20 w-full flex justify-between top-24 fixed z-[5] items-center">
        <div className="left">
          <button
            type="button"
            className="py-3 px-3 text-sm font-medium rounded-full border focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
          >
            <SvgList2 width="25" height="25" />
          </button>
        </div>
        <div className="right flex">
          <button
            id="dropdownButton"
            className="text-white focus:outline-none font-medium rounded-lg text-xl px-14 py-3 m-3 text-left flex items-center focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
            type="button"
          >
            Order by <SvgChevron className="ml-4 w-4 h-4" />
          </button>

          <div className="inline-flex rounded-md shadow-sm m-3" role="group">
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium rounded-l-lg border focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
            >
              <SvgGrid2 width="25" height="25" />
            </button>
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium rounded-r-md border focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
            >
              <SvgGrid3 width="25" height="25" />
            </button>
          </div>

          <div
            id="dropdownMenu"
            className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownButton"
            >
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="market_list relative top-48">
        <div className="market_list-container flex flex-wrap justify-center w-auto rounded-lg mb-48">
          {nfts &&
            nfts.map((e) => {
              return (
                <Link href={'/api/nfts'} key={e.id}>
                  <div
                    key={e.id}
                    className="market_list-card max-w-sm m-10 rounded-lg border shadow-md bg-gray-800 border-gray-700 cursor-pointer"
                  >
                    <Image
                      className="rounded-t-lg"
                      src={e.image}
                      alt="ds"
                      width={1000}
                      height={1000}
                      layout="intrinsic"
                    />
                    <div className="p-5">
                      <div className="title flex flex-row items-center justify-between">
                        <a href="#">
                          <h5
                            className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${styles.nft_title}`}
                          >
                            {e.name}
                          </h5>
                        </a>
                        <div className="likes flex text-white font-semibold items-center justify-center text-center gap-3 bg-gray-500 rounded-full w-16 h-8">
                          {e._count.likedBy}{' '}
                          <SvgHeart
                            height={20}
                            width={20}
                            className="hover:fill-red-600 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <p className="text-white ml-5 flex">
                        {e.categories.map((e) => (
                          <p key={e.name}>#{e.name}</p>
                        ))}
                      </p>
                    </div>
                    <div className="p-5">
                      <div className="owner flex flex-row items-center justify-between">
                        <a href="#" className="flex items-center">
                          <RiVipCrownFill className="fill-yellow-500 mr-2" />
                          <h5
                            className={`text-xl font-semibold tracking-tigh text-white ${styles.nft_title}`}
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
                            className={`text-xl font-semibold tracking-tigh text-white ${styles.nft_title}`}
                          >
                            {'15'}
                          </h5>
                        </div>
                      </div>
                    </div>
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
