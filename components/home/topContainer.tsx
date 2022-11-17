// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgArrow from '@components/icons/svgArrow'
import SvgChevronDown from '@components/icons/svgChevronDown'
import SvgHeart from '@components/icons/svgHeart'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { NftsResponse } from 'types/api-responses'
import styles from '../../styles/form.module.css'

const TopContainer = ({ nfts }: { nfts: NftsResponse }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selected, setSelected] = useState(nfts[0])

  const selectNewImage = (nfts: NftsResponse, next = true) => {
    const condition = next ? selectedIndex < nfts.length - 1 : selectedIndex > 0
    const nextIndex = next
      ? condition
        ? selectedIndex + 1
        : 0
      : condition
      ? selectedIndex - 1
      : nfts.length - 1
    setSelected(nfts[nextIndex])
    setSelectedIndex(nextIndex)
  }

  const previous = () => {
    selectNewImage(nfts, false)
  }

  const next = () => {
    selectNewImage(nfts)
  }
  return (
    <section className="home__top flex flex-col items-center w-full m-14 max-md:m-0 max-md:mt-0 max-xl:px-12 max-sm:px-0 ease duration-500">
      <div className="home__top-titles flex flex-col text-center m-16 max-lg:mx-0 max-lg:mb-0">
        <p className="text-5xl font-bold tracking-wide max-md:text-3xl ease duration-500">
          Most liked <span className="font-extrabold text-blue-600">NFTs</span>
        </p>
        <p className="m-5 text-center text-lg text-gray-600 dark:text-gray-400 max-md:text-sm ease duration-500">
          Meet the top 3 NFT&apos;s with the most likes in the entire
          marketplace!
        </p>
      </div>
      <div className="xl:hidden relative mt-14 max-lg:mt-2 h-[43rem] flex justify-center items-center w-[90%] lg:w-full max-w-7xl max-md:bg-transparent max-lg:max-w-2xl rounded-2xl ease duration-500">
        <div className="xl:hidden flex flex-row justify-center items-center gap-8 ease duration-500">
          <div className="init-card max-w-sm m-18 bg-gray-300 border-2 border-gray-400 dark:bg-[#303339] dark:border-zinc-600 dark:border-0 rounded-xl">
            <Image
              className="object-cover rounded-t-xl group-hover:scale-110 transition-all"
              src={selected?.image}
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
                    {selected?.name}
                  </h5>
                </a>
                <div className="likes flex text-white font-semibold items-center justify-center text-center gap-3 bg-gray-500 rounded-full w-16 h-8">
                  {selected?._count.likedBy}{' '}
                  <SvgHeart
                    height={20}
                    width={20}
                    className="hover:text-red-600 hover:fill-red-600 transition-all duration-75"
                  />
                </div>
              </div>
            </div>
            <p className="my-3 px-5 font-normal text-gray-700 dark:text-gray-400">
              {selected?.description
                ? selected.description
                : 'No description was provided.'}
            </p>
            <a
              href="#"
              className="inline-flex my-5 ml-5 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              See details
              <SvgArrow className="animate-pulse transition-all ml-2 -mr-1 w-4 h-4" />
            </a>
          </div>
        </div>
        <button
          className="absolute max-xl:left-8 max-sm:-left-0 xl:hidden"
          onClick={previous}
        >
          <SvgChevronDown
            className="rotate-90 fill-white max-xl:scale-150 max-sm:scale-100"
            heigth="40"
            width="40"
          />
        </button>

        <button
          className="absolute max-xl:right-8 max-sm:-right-0  xl:hidden"
          onClick={next}
        >
          <SvgChevronDown
            className="-rotate-90 fill-white max-xl:scale-150 max-sm:scale-100"
            heigth="40"
            width="40"
          />
        </button>
      </div>
      <div className="home__top-container bg-slate-900 dark:bg-[#303339] max-xl:hidden xl:py-16 xl:px-8 lg:p-5 relative flex flex-row items-center justify-center gap-4 w-auto rounded-lg mb-16">
        {nfts &&
          nfts.map((e) => {
            return (
              <div
                key={e.id}
                className="init-card overflow-hidden bg-transparent border-2 border-slate-800 dark:bg-[#303339] dark:border-2 dark:border-zinc-600 hover:-translate-y-2 hover:shadow-lg transition-all duration-500 max-w-sm rounded-xl group"
              >
                <Image
                  className="rounded-t-xl object-cover group-hover:scale-110 transition-all duration-500"
                  src={e.image}
                  alt="ds"
                  width={500}
                  height={700}
                  quality={20}
                  layout="intrinsic"
                />
                <div className="p-5">
                  <div className="title flex flex-row items-center justify-between">
                    <h5
                      className={`text-2xl font-bold tracking-tight text-white truncate ${styles.nft_title}`}
                    >
                      {e.name}
                    </h5>
                    <div className="likes flex text-white font-semibold items-center justify-center text-center gap-3 bg-gray-500 rounded-full w-16 h-8">
                      {e._count.likedBy}{' '}
                      <SvgHeart
                        height={20}
                        width={20}
                        className="hover:text-red-600 hover:fill-red-600 transition-all duration-75"
                      />
                    </div>
                  </div>
                </div>
                <p className="my-3 px-5 font-normal text-gray-400 line-clamp-2">
                  {e.description ? e.description : 'No description provided.'}
                </p>
                <Link href={`/nfts/${e.id}`}>
                  <a>
                    <div className="cursor-pointer inline-flex my-5 ml-5 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all">
                      See details
                      <SvgArrow className="animate-pulse transition-all ml-2 -mr-1 w-4 h-4" />
                    </div>
                  </a>
                </Link>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default TopContainer
