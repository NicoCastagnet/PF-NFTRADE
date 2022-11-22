// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgLoading from '@components/icons/svgLoading'
import SvgNewTab from '@components/icons/svgNewTab'
import SvgTrash from '@components/icons/svgTrash'
import axios from 'axios'
import useDetail from 'hook/useDetail'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'

const Nfts = ({ id, image, name, views, likes, nft, mutate, collectionId }) => {
  const { session, subState, setSubState, handlePublished, putPrice } =
    useDetail(nft)

  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    toast.success('NFT successffully deleted!')
    await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/put/nftPutErased`, {
      id: nft?.id,
      collectionId: nft?.collectionId,
    }),
      mutate(`/api/user/${session?.user.id}`)
  }

  return (
    <>
      <div
        key={id}
        className={`h-auto w-[22rem] m-2 overflow-hidden relative flex flex-col rounded-xl p-[1px] group drop-shadow-lg ${
          loading && 'hidden'
        }`}
      >
        <div
          className={`h-auto w-[22rem] overflow-hidden relative flex flex-col bg-white dark:bg-[#303339] rounded-xl p-[1px] group`}
        >
          <SvgTrash
            className="absolute z-50 h-6 w-6 left-[19.5rem] m-2 dark:fill-[#979797] dark:hover:fill-red-600 transition-all cursor-pointer"
            onClick={() => handleDelete()}
          />
          <a
            href={`${process.env.NEXT_PUBLIC_APP_URL}/nfts/${id}`}
            target="_blank"
            rel="noreferrer"
          >
            <SvgNewTab className="absolute z-50 h-5 w-5 m-2 dark:fill-[#979797] dark:hover:fill-blue-600 transition-all" />
          </a>
          <div className="rounded-xl border-spacing-2 h-[20rem]">
            <Image
              src={image}
              height={370}
              width={400}
              quality={20}
              alt={`image-${name}`}
              className="rounded-t-xl object-cover group-hover:scale-110 transition duration-300 ease-in-out overflow-auto"
            />
          </div>
          <div className="flex flex-col p-4 h-full w-full justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row w-full justify-between">
                <h5
                  className={`text-2xl text-gray-800 dark:text-white font-bold truncate ease duration-300`}
                >
                  {name}
                </h5>
              </div>
              {subState.loadingPublished ? (
                <div className="flex justify-center items-center rounded-full my-2 text-lg">
                  <SvgLoading className="w-5 h-5 animate-spin mr-2" />{' '}
                  Loading...
                </div>
              ) : collectionId ? (
                <Link href={`/collections/${collectionId}`}>
                  <button className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#393b41] dark:hover:bg-[#4c4e53] transition-all text-lg font-semibold w-full h-10 my-1">
                    Go to collection.
                  </button>
                </Link>
              ) : subState.published === false ? (
                <button
                  className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#393b41] dark:hover:bg-[#4c4e53] transition-all text-lg font-semibold w-full h-10 my-1"
                  onClick={() => handlePublished(!subState.published)}
                >
                  Click to publish the NFT.
                </button>
              ) : (
                <button
                  className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#393b41] dark:hover:bg-[#4c4e53] transition-all text-lg font-semibold w-full h-10 my-1"
                  onClick={() => handlePublished(!subState.published)}
                >
                  Click to remove the NFT.
                </button>
              )}
              <button className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#393b41] dark:hover:bg-[#4c4e53] transition-all text-lg font-semibold w-full h-10 my-1">
                <p>
                  NFT price:{' '}
                  <input
                    className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#4c4e53] dark:hover:bg-[#393b41] text-lg text-center font-semibold w-20 rounded-md mx-1 transition-all outline-none focus:outline-none"
                    type="number"
                    value={subState.price}
                    max={4}
                    min={1}
                    onChange={(e) => {
                      parseFloat(e.target.value) <= 1
                        ? setSubState((state) => ({ ...state, price: 1 }))
                        : parseFloat(e.target.value) >= 9999
                        ? setSubState((state) => ({ ...state, price: 9999 }))
                        : e.target.value === ''
                        ? setSubState((state) => ({ ...state, price: 1 }))
                        : setSubState((state) => ({
                            ...state,
                            price: parseFloat(e.target.value),
                          }))
                    }}
                    onBlur={putPrice}
                  />
                </p>
              </button>
            </div>
            <div className="flex flex-row justify-between items-center text-lg text-gray-800 dark:text-white font-semibold mt-2">
              <div className="flex flex-row justify-center items-center gap-2 ">
                <p>NFT Views: </p>
                <span>{views.length}</span>
              </div>
              <div className="flex flex-row justify-center items-center gap-2">
                <p>NFT Likes: </p>
                <span>{likes.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default Nfts
