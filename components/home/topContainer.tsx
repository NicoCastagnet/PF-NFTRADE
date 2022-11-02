// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgHeart from '@components/icons/svgHeart'
import Image from 'next/image'
import { useState } from 'react'
import type { NftsResponse } from 'types/api-responses'
import styles from '../../styles/form.module.css'

const TopContainer = ({ nfts }: { nfts: NftsResponse }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [selected, setSelected] = useState(nfts[0])

  const selectNewImage = (index: number, nfts: NftsResponse, next = true) => {
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
    selectNewImage(selectedIndex, nfts, false)
  }

  const next = () => {
    selectNewImage(selectedIndex, nfts)
  }
  return (
    <section className="home__top flex flex-col items-center w-full m-14 max-md:mt-0">
      <div className="home__top-titles flex flex-col text-center m-16 max-lg:mx-0 max-lg:mb-0">
        <p className="text-5xl font-bold tracking-wide max-md:text-3xl ease duration-500">
          Most liked <span className="font-extrabold text-blue-600">NFTs</span>
        </p>
        <p className="m-5 text-center text-lg text-gray-500 max-md:text-sm ease duration-500">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>
      <div className=" xl:hidden relative mt-14 max-lg:mt-2 h-[43rem] flex justify-center items-center w-full max-w-7xl bg-slate-900 max-lg:max-w-2xl rounded-2xl ease duration-500">
        <div className="xl:hidden flex flex-row justify-center items-center gap-8 ease duration-500">
          <div
            key={selected?.id}
            className="init-card max-w-sm m-18 rounded-lg border shadow-md bg-gray-800 border-gray-700"
          >
            <a href="#">
              <Image
                className="rounded-t-lg object-cover"
                src={selected?.image}
                alt="ds"
                width={1000}
                height={1000}
                layout="intrinsic"
              />
            </a>
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
                    className="hover:fill-red-600 transition-all"
                  />
                </div>
              </div>
            </div>
            <p className="my-3 px-5 font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
            <a
              href="#"
              className="inline-flex my-5 ml-5 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                aria-hidden="true"
                className="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>
        <button
          className="absolute left-3 xl:hidden p-4 bg-slate-600 rounded-full hover:rounded-full hover:bg-slate-400 ease duration-150"
          onClick={previous}
        >
          {'<'}
        </button>

        <button
          className="absolute right-3 xl:hidden p-4 bg-slate-600 rounded-full hover:rounded-full hover:bg-slate-400 ease duration-150"
          onClick={next}
        >
          {'>'}
        </button>
      </div>
      <div className="home__top-container max-xl:hidden xl:py-16 xl:px-8 lg:p-5 relative flex flex-row items-center justify-center gap-4 w-auto rounded-lg mb-16 bg-gray-800">
        {nfts &&
          nfts.map((e) => {
            return (
              <div
                key={e.id}
                className="init-card max-w-sm  rounded-lg border shadow-md bg-gray-800 border-gray-700"
              >
                <a href="#">
                  <Image
                    className="rounded-t-lg object-cover"
                    src={e.image}
                    alt="ds"
                    width={1000}
                    height={1000}
                    layout="intrinsic"
                  />
                </a>
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
                <p className="my-3 px-5 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <a
                  href="#"
                  className="inline-flex my-5 ml-5 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    aria-hidden="true"
                    className="ml-2 -mr-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            )
          })}
      </div>
    </section>
  )
}

export default TopContainer
