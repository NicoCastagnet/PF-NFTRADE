// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Footer from '@components/footer'
import SvgCheck from '@components/icons/svgCheck'
import SvgLoading from '@components/icons/svgLoading'
import SvgPencil from '@components/icons/svgPencil'
import SvgPlus from '@components/icons/svgPlus'
import SvgTrash from '@components/icons/svgTrash'
import SvgViews from '@components/icons/svgViews'
import NavBar from '@components/navbar/navbar'
import Comments from '@components/nftDetail/comments'
import Likes from '@components/nftDetail/likes'
import axios from 'axios'
import { useCart } from 'context/cart'
import useDetail from 'hook/useDetail'
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { toast, Toaster } from 'react-hot-toast'
import type { NftDetailResponse } from 'types/api-responses'

interface NftDetailProps {
  nft: NftDetailResponse
}

const NftDetail: NextPage<NftDetailProps> = ({ nft }) => {
  const { cart, addItem } = useCart()

  const {
    session,
    subState,
    setSubState,
    addToWished,
    deleteNft,
    handlePublished,
    putPrice,
  } = useDetail(nft, true)

  return (
    <div className="bg-gray-200 dark:bg-[#202225] flex flex-col items-center justify-around w-full min-h-screen transition-all">
      <NavBar />
      <div className="flex flex-col justify-center items-center mt-[120px] mx-20">
        <div
          className={`${
            subState.deleteWarning === true
              ? 'bg-gray-200 dark:bg-[#303339] flex justify-center border-[1px] rounded-[15px] shadow-red-800 shadow-md min-w-[300px] w-[60%] min-h-[300px] fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1]'
              : 'hidden'
          } `}
        >
          <button
            onClick={() =>
              setSubState((state) => ({ ...state, deleteWarning: false }))
            }
            className="rounded-full flex justify-center items-center dark:bg-zinc-700 w-[36px] h-[36px] border-[1px] border-gray-400 hover:scale-[1.1] transition-all absolute top-[11%] right-[0%] translate-x-[-50%] translate-y-[-50%] "
          >
            X
          </button>
          <div className="w-full flex justify-center flex-col items-center">
            <p className="text-[1.2rem] mb-8">{`Are you sure you want to delete ${nft?.name}? this action will be permanent`}</p>
            <div>
              <button
                onClick={deleteNft}
                className="mr-10 w-[100px] bg-red-800 hover:scale-[1.1] transition-all h-[40px] rounded-[15px]  shadow-md shadow-gray-900 ]"
              >
                Delete
              </button>
              <button
                onClick={() =>
                  setSubState((state) => ({ ...state, deleteWarning: false }))
                }
                className="w-[100px] h-[40px] rounded-[15px] hover:scale-[1.1] transition-all  shadow-md shadow-gray-900 ]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div
          className={` w-full ${
            subState.deleteWarning === true && 'blur-[10px] opacity-40'
          } `}
        >
          <div className="flex flex-col lg:flex-row items-center justify-center w-full mb-[50px]">
            <div className=" lg:mr-10">
              <header className="flex justify-between items-center px-5 sm:w-[555px] w-[300px] h-[55px] rounded-t-md bg-gray-100 dark:bg-[#303339]">
                <p className="text-gray-600 dark:text-gray-400 text-[0.8rem] sm:text-[1rem] ">
                  #{nft.id.toUpperCase()}
                </p>
                {(session?.user.id === nft?.owner.id ||
                  subState.admin === true) && (
                  <SvgTrash
                    onClick={() =>
                      setSubState((state) => ({
                        ...state,
                        deleteWarning: true,
                      }))
                    }
                    className={` ml-4 w-[25px] h-[25px] fill-slate-500 max-sm:w-5 max-sm:h-5 ${
                      subState.admin === true
                        ? 'hover:fill-yellow-500'
                        : 'hover:fill-red-800'
                    }  cursor-pointer`}
                  />
                )}
              </header>
              <div className=" w-[300px] h-[300px]  sm:w-[555px]  sm:h-[555px] border-2 border-gray-100 dark:border-[#303339]">
                <Image
                  src={nft?.image}
                  alt={`img-${nft?.name}`}
                  className=" object-cover"
                  quality={50}
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between text-gray-600 dark:text-white mt-5 sm:ml-5 sm:my-10">
              <div className="arriba w-full">
                <h5 className="text-4xl font-bold max-sm:text-lg">
                  {nft?.name} #{nft?.id.slice(0, 5).toUpperCase()}
                </h5>
                <div className="w-auto flex sm:items-center sm:justify-start my-6 flex-col sm:flex-row max-sm:my-2">
                  <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold mr-4 max-sm:text-lg">
                    Property of{' '}
                    <span className="text-blue-500 hover:underline hover:text-blue-600 cursor-pointer">
                      <Link href={`/users/${nft?.owner.id}`}>
                        {nft?.owner.name}
                      </Link>
                    </span>
                  </p>
                  <div className="flex flex-row items-center text-gray-600 dark:text-gray-400 font-semibold text-lg mr-4 max-sm:text-base max-sm:my-2">
                    <SvgViews className="w-7 h-7 fill-gray-600 dark:fill-gray-400 mr-2 max-sm:w-5 max-sm:h-5" />
                    {nft?._count.viewedBy} views
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold text-lg mr-4 max-sm:text-base">
                    <Likes nftId={nft.id} />
                    <p className="ml-2">likes</p>
                  </div>
                </div>
                {nft.owner.id !== session?.user.id && (
                  <div className="flex flex-row items-center mb-5">
                    {subState.loadingWish ? (
                      <div className="animate-spin flex justify-center items-center ml-1 w-[40px] h-[40px] rounded-full">
                        <SvgLoading className="max-sm:w-5 max-sm:h-5" />
                      </div>
                    ) : (
                      <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold text-lg max-sm:text-base">
                        <button
                          onClick={addToWished}
                          className={`fill-slate-200 ${
                            subState.wishlisted === true && ' fill-green-600 '
                          } hover:fill-slate-300 flex justify-center items-center`}
                        >
                          <SvgPlus className="w-8 h-8 bg-zinc-700 p-1 rounded-full mr-2 max-sm:w-6 max-sm:h-6" />
                          {subState.wishlisted === true
                            ? 'Remove from wishlist'
                            : 'Add to wishlist'}
                        </button>
                      </div>
                    )}
                  </div>
                )}
                <div className="flex text-gray-600 dark:text-gray-400 font-semibold text-lg flex-row justify-start items-center gap-2">
                  {subState.priceToEdit === true ? (
                    <div className="flex">
                      <input
                        type="number"
                        value={subState.price}
                        onChange={(e) =>
                          setSubState((state) => ({
                            ...state,
                            price: e.target.value,
                          }))
                        }
                        placeholder={subState.price}
                        className="w-[80px] h-[30px] bg-gray-200 border-b-gray-400 dark:bg-[#202225] border-b-[1px] text-[1.1rem] focus:outline-none outline-none block p-1"
                      />
                      <div className="flex justify-center items-center">
                        <button
                          className={`hover:fill-slate-400 fill-slate-300 disabled:fill-red-600 cursor-pointer disabled:cursor-not-allowed`}
                          onClick={putPrice}
                          disabled={
                            subState.price <= 0 || subState.price > 9999
                          }
                        >
                          <SvgCheck className="ml-2" height={25} width={25} />
                        </button>
                        {subState.price > 9999 ? (
                          <span className=" text-red-600 text-1 ml-2 ">
                            * Price must be less than 9999.
                          </span>
                        ) : (
                          subState.price <= 0 && (
                            <span className=" text-red-600 text-1 ml-2 ">
                              * Price must be greater than 0.
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center max-sm:text-lg">
                      <span>
                        Product price{' '}
                        <span className="text-xl font-bold max-sm:text-lg">
                          {subState.price}
                        </span>{' '}
                        coins.
                      </span>
                      {session?.user?.id === nft?.owner.id && (
                        <SvgPencil
                          className="ml-3 fill-slate-300 hover:fill-slate-400 cursor-pointer max-sm:w-4 max-sm:h-4"
                          height={20}
                          width={20}
                          onClick={() =>
                            setSubState((state) => ({
                              ...state,
                              priceToEdit: true,
                            }))
                          }
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="buttons flex justify-center mb-2 items-center">
                {nft?.owner.id === session?.user?.id ? (
                  subState.loadingPublished ? (
                    <div className="animate-spin flex justify-center items-center w-full h-[82px] mt-2 rounded-full">
                      <SvgLoading className="w-[40px] h-[40px]" />
                    </div>
                  ) : subState.published === false ? (
                    <div className="flex w-full mb-2 max-sm:py-4">
                      <button
                        onClick={() => handlePublished(true)}
                        className="w-full text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all py-4 rounded-xl mr-2 max-sm:py-3 max-sm:text-lg"
                      >
                        Add to market
                      </button>
                    </div>
                  ) : nft?.collectionId ? (
                    <div className="flex w-full max-sm:py-4 ">
                      <p className="w-full text-center italic text-xl bg-white text-gray-600 dark:text-gray-400 dark:bg-[#303339] transition-all py-4 rounded-xl mr-2 max-sm:py-3 max-sm:text-base max-sm:px-2">
                        This NFT belongs to a collection, if you want to add or
                        remove it from the market particullary, please delete
                        the collection.
                      </p>
                    </div>
                  ) : (
                    <div className="flex w-full max-sm:py-4">
                      <button
                        onClick={() => handlePublished(false)}
                        className="w-full text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all py-4 rounded-xl mr-2 max-sm:py-3 max-sm:text-lg"
                      >
                        Remove from market
                      </button>
                    </div>
                  )
                ) : subState.published === false ? (
                  <div className="flex w-full max-sm:py-4 ">
                    <p className="w-full text-center italic text-xl bg-white text-gray-600 dark:text-gray-400 dark:bg-[#303339] transition-all py-4 rounded-xl mr-2 max-sm:py-3 max-sm:text-lg">
                      This product is not for sale at this time
                    </p>
                  </div>
                ) : nft?.collectionId ? (
                  <Link href={`/collections/${nft?.collectionId}`}>
                    <div className="flex items-center py-6 w-full ">
                      <button className="w-full text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all py-4 rounded-xl mr-2 max-sm:py-3 max-sm:text-lg">
                        Go to collection
                      </button>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center py-6 w-full ">
                    <button
                      className="w-full text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all py-4 rounded-xl mr-2 max-sm:py-3 max-sm:text-lg"
                      onClick={() => {
                        addItem(nft)
                        cart.find((e) => e.name === nft?.name)
                          ? toast.error(
                              'You have already added this NFT to the cart!',
                            )
                          : toast.success('NFT added to the cart!')
                      }}
                    >
                      Add to cart
                    </button>
                  </div>
                )}

                {session?.user.id !== nft?.owner.id &&
                  subState.published === true && (
                    <Link href={'#'}>
                      <button className="w-full text-xl bg-blue-600 hover:bg-blue-700 text-white dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700 hover:drop-shadow-lg transition-all py-4 rounded-xl mr-2 max-sm:py-3 max-sm:text-lg">
                        Buy now
                      </button>
                    </Link>
                  )}
              </div>
              <article className="abajo w-full min-h-[285px] rounded-t-xl border-2 border-gray-100 dark:border-[#303339]">
                <header className="flex justify-between items-center text-xl font-semibold px-5 w-full h-[50px] rounded-t-md bg-gray-100 text-gray-600 dark:bg-[#303339] dark:text-gray-400 max-sm:text-base">
                  Description
                </header>
                {nft?.description ? (
                  <p className="text-[1.2rem] p-5 text-gray-600 dark:text-gray-400 max-sm:text-base">
                    {nft?.description}
                  </p>
                ) : (
                  <p className="text-[1.2rem] p-5">
                    The creator did not provide a description
                  </p>
                )}
              </article>
            </div>
          </div>
          <Comments nftId={nft.id} />
        </div>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/nfts/${params.id}`,
  )
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      nft: data,
    },
  }
}

export default NftDetail
