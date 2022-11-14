// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Footer from '@components/footer'
import NavBar from '@components/navbar/navbar'
import getNftById from '@lib/api/nfts/getById'
import { useCart } from 'context/cart'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ChangeEvent, useEffect, useState } from 'react'

import SvgLoading from '@components/icons/svgLoading'

import Comments from '@components/nftDetail/comments'

import SvgCheck from '@components/icons/svgCheck'
import SvgCoin from '@components/icons/svgCoin'
import SvgPencil from '@components/icons/svgPencil'
import SvgPlus from '@components/icons/svgPlus'
import SvgTrash from '@components/icons/svgTrash'
import SvgViews from '@components/icons/svgViews'
import Likes from '@components/nftDetail/likes'
import { toast, Toaster } from 'react-hot-toast'
import type { NftDetailResponse } from 'types/api-responses'

interface NftDetailProps {
  nft: NftDetailResponse
}

const NftDetail: NextPage<NftDetailProps> = ({ nft }) => {
  const { cart, addItem } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  const { id: nftId } = router.query
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    async function putViews() {
      await fetch('/api/put/nftViews', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session?.user?.id,
          nftId: nft.id,
        }),
      })
    }
    if (session?.user) putViews()
    if (nft.wishedBy.includes(session?.user?.id)) {
      setWishlisted(true)
    }
    async function getAdmin() {
      await fetch(`/api/user/${session?.user.id}/getIsAdmin/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((r) => r.json())
        .then((r) => setAdmin(r))
    }
    getAdmin()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nft.id, session?.user?.id])

  console.log(admin)

  const [priceToEdit, setPriceToEdit] = useState(false)
  const [price, setPrice] = useState<string | number>(nft.price)

  function handlePrice(e: ChangeEvent<HTMLInputElement>) {
    setPrice(e.target.value)
  }

  async function putPrice() {
    await fetch('/api/put/nftPrice', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nftId: nft.id,
        price: parseFloat(price),
      }),
    })
    setPriceToEdit(false)
  }

  const [wishlisted, setWishlisted] = useState(false)

  const [loadingWish, setLoadingWish] = useState(false)

  async function addToWished() {
    setLoadingWish(true)

    if (nft.wishedBy.includes(session?.user?.id)) {
      setWishlisted(false)
      nft.wishedBy = nft.wishedBy.filter((w) => w !== session?.user?.id)
    } else {
      nft.wishedBy.push(session?.user?.id)
      setWishlisted(true)
    }
    await fetch('/api/put/wishes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nftId: nft.id,
        userId: session?.user?.id,
      }),
    })
    setWishAdvice(false)
    setLoadingWish(false)
  }

  const [wishAdvice, setWishAdvice] = useState(false)

  const [published, setPublished] = useState(nft.published)

  const [loadingPublished, setLoadingPublished] = useState(false)

  async function handlePublished(boolean: boolean) {
    setLoadingPublished(true)
    setPublished(boolean)
    await fetch('/api/put/published', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nftId: nft.id,
        published: boolean,
      }),
    })
    setLoadingPublished(false)
  }

  const categories = nft.categories.map((c) => c.name)

  const [deleteWarning, setDeleteWarning] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  async function deleteNft() {
    setDeleteLoading(true)
    await fetch('/api/put/nftPutErased', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: nft.id,
        collectionId: nft.collectionId,
      }),
    })
    setDeleteLoading(false)
    router.push(`/`)
  }

  return (
    <div className="bg-gray-200 dark:bg-[#202225] flex flex-col items-center justify-around w-full min-h-screen transition-all">
      <NavBar />
      <div className="flex flex-col  justify-center items-center mt-[120px] ">
        <div
          className={`${
            deleteWarning === true
              ? 'bg-gray-200 dark:bg-[#303339] flex justify-center border-[1px] rounded-[15px] shadow-red-800 shadow-md min-w-[300px] w-[60%] min-h-[300px] fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1]'
              : 'hidden'
          } `}
        >
          <button
            onClick={() => setDeleteWarning(false)}
            className="rounded-full flex justify-center items-center dark:bg-zinc-700 w-[36px] h-[36px] border-[1px] border-gray-400 hover:scale-[1.1] transition-all absolute top-[11%] right-[0%] translate-x-[-50%] translate-y-[-50%] "
          >
            X
          </button>
          <div className="w-full flex justify-center flex-col items-center">
            <p className="text-[1.2rem] mb-8">{`Are you sure you want to delete ${nft.name}? this action will be permanent`}</p>
            <div>
              <button
                onClick={deleteNft}
                className="mr-10 w-[100px] bg-red-800 hover:scale-[1.1] transition-all h-[40px] rounded-[15px]  shadow-md shadow-gray-900 ]"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteWarning(false)}
                className="w-[100px] h-[40px] rounded-[15px] hover:scale-[1.1] transition-all  shadow-md shadow-gray-900 ]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div
          className={` w-[80%] ${
            deleteWarning === true && 'blur-[10px] opacity-40'
          } `}
        >
          <div className="flex justify-center w-full mb-[50px]">
            <div className="mr-10 ">
              <header className="flex justify-between items-center px-5 w-[600px] h-[55px] rounded-t-md bg-gray-100 dark:bg-[#303339]">
                <p className="text-gray-600 dark:text-gray-400">
                  #{nft.id.toUpperCase()}
                </p>
                {session?.user.id === nft.owner.id ||
                  (admin === true && (
                    <SvgTrash
                      onClick={() => setDeleteWarning(true)}
                      className={` ml-4 w-[25px] h-[25px] fill-slate-500 ${
                        admin === true && 'hover:fill-yellow-500'
                      } hover:fill-red-800 cursor-pointer`}
                    />
                  ))}
              </header>
              <div className="w-[600px] h-[600px] border-2 border-gray-100 dark:border-[#303339]">
                <Image
                  src={nft.image}
                  alt={`img-${nft.name}`}
                  className=" object-cover"
                  quality={50}
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
            <div className="flex flex-col justify-between text-gray-600 dark:text-white ml-5">
              <div className="arriba w-full">
                <h5 className="text-4xl font-bold">
                  {nft.name} #{nft.id.slice(0, 5).toUpperCase()}
                </h5>
                <div>
                  {categories.map((c) => (
                    <span key={c} className="mr-2">
                      #{c}
                    </span>
                  ))}
                </div>
                <div className="  w-full items-center justify-between flex mt-6 mb-4">
                  <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold mr-5">
                    Property of{' '}
                    <span className="text-blue-500 hover:underline hover:text-blue-600 cursor-pointer">
                      <Link href={`/users/${nft.owner.id}`}>
                        {nft.owner.name}
                      </Link>
                    </span>
                  </p>
                  {nft.owner.id !== session?.user.id && (
                    <div className="flex flex-row  w-[240px] h-[40px] items-center">
                      {loadingWish ? (
                        <div className="animate-spin flex justify-center items-center ml-1 w-[40px] h-[40px] rounded-full">
                          <SvgLoading />
                        </div>
                      ) : (
                        <div className="flex w-[240px] items-center ml-2">
                          <button
                            onMouseOver={() => setWishAdvice(true)}
                            onMouseOut={() => setWishAdvice(false)}
                            onClick={addToWished}
                            className={`fill-slate-200 ${
                              wishlisted === true && ' fill-green-600 '
                            } hover:fill-slate-300 bg-zinc-700 flex justify-center items-center w-[30px] h-[30px] rounded-full `}
                          >
                            <SvgPlus className="w-[25px] h-[25px] " />
                          </button>
                          {wishAdvice === true && (
                            <span className="w-auto p-4 h-[30px] bg-zinc-300 dark:bg-zinc-900 flex justify-center items-center rounded-[12px] transition-all ml-2">
                              {`${
                                wishlisted === false
                                  ? 'Add to wishlist'
                                  : 'Remove from wishlist'
                              }`}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex mb-6">
                  <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold text-lg mr-5">
                    <SvgViews className="w-7 h-7 fill-gray-600 dark:fill-gray-400 mr-2" />
                    {nft._count.viewedBy} views
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold text-lg mr-5">
                    <Likes nftId={nftId as string} />
                    <p className="ml-2">likes</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-row justify-between w-full">
                    <div className="flex ">
                      <div className="flex mr-3">
                        <p className="text-[1.5rem]">Actual price</p>
                      </div>
                      <div className=" text-[1.3rem] flex flex-row justify-start items-center gap-2">
                        <SvgCoin height={24} width={24} />
                        {priceToEdit === true ? (
                          <div className="flex">
                            <input
                              type="number"
                              value={price}
                              onChange={(e) => handlePrice(e)}
                              className="w-[80px] h-[30px] bg-gray-200 border-b-gray-400 dark:bg-[#202225] border-b-[1px] placeholder:${price} focus:ring-blue-500 text-[1.1rem] focus:border-blue-500 block w-full p-1"
                            ></input>
                            <div className="flex justify-center items-center">
                              <button
                                className={`hover:fill-slate-400 fill-slate-300 disabled:fill-red-800 cursor-pointer disabled:cursor-not-allowed`}
                                onClick={putPrice}
                                disabled={price <= 0 || price > 9999}
                              >
                                <SvgCheck
                                  className="ml-2"
                                  height={30}
                                  width={30}
                                />
                              </button>
                              {price > 9999 ? (
                                <span className=" text-red-800 text-[0.9rem] ml-2 ">
                                  *Price must be less than 9999
                                </span>
                              ) : (
                                price <= 0 && (
                                  <span className=" text-red-800 text-[0.9rem] ml-2 ">
                                    *Price must be greater than 0
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span>{price}</span>
                            {session?.user?.id === nft.owner.id && (
                              <div>
                                <SvgPencil
                                  className="ml-3 fill-slate-300 hover:fill-slate-400 cursor-pointer"
                                  height={20}
                                  width={20}
                                  onClick={() => setPriceToEdit(true)}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="buttons flex justify-center items-center my-[12px] max-w-[590px]">
                  {nft.owner.id === session?.user?.id ? (
                    loadingPublished ? (
                      <div className="animate-spin flex justify-center items-center w-full h-[82px] mt-2 rounded-full">
                        <SvgLoading className="w-[40px] h-[40px] " />
                      </div>
                    ) : published === false ? (
                      <div className="flex w-full ">
                        <button
                          onClick={() => handlePublished(true)}
                          className="text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all w-full min-h-[90px] py-3 px-20 rounded-xl mr-2"
                        >
                          Add to market
                        </button>
                      </div>
                    ) : nft.collectionId ? (
                      <div className="flex w-full ">
                        <p className="text-[1.2rem] min-h-[90px] flex justify-center items-center text-gray-400 italic p-4 bg-gray-600 rounded-xl w-full">
                          This NFT belongs to a collections, if you want to add
                          or remove it from te market particullary, please
                          delete the collection
                        </p>
                      </div>
                    ) : (
                      <div className="flex w-full ">
                        <button
                          onClick={() => handlePublished(false)}
                          className="text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all w-full min-h-[90px] py-3 px-20 rounded-xl mr-2"
                        >
                          Remove from market
                        </button>
                      </div>
                    )
                  ) : published === false ? (
                    <div className="flex w-full ">
                      <p className="text-[1.2rem] min-h-[90px] flex justify-center items-center text-gray-400 italic p-4 bg-gray-600 rounded-xl w-full">
                        This product is not for sale at this time
                      </p>
                    </div>
                  ) : nft.collectionId ? (
                    <Link href={`/collections/${nft.collectionId}`}>
                      <button className="text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all w-full min-h-[90px] py-3 px-20 rounded-xl mr-2">
                        Go to collection
                      </button>
                    </Link>
                  ) : (
                    <div className="flex items-center py-6 w-full ">
                      <button
                        className="text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all w-[100%] min-h-[90px] py-3 px-20 rounded-xl mr-2"
                        onClick={() => {
                          addItem(nft)
                          cart.find((e) => e.name === nft.name)
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
                  {session?.user.id !== nft.owner.id && published === true && (
                    <Link href={'#'}>
                      <button className="text-xl w-[50%] min-h-[90px] text-white bg-blue-600 hover:bg-blue-500 hover:drop-shadow-lg transition-all py-3 px-20 mx-2 rounded-xl">
                        Buy now
                      </button>
                    </Link>
                  )}
                  {/* //dev */}
                </div>
                <article className="abajo mt-6 w-full sm:w-[580px] min-h-[285px] lg:mt-0 rounded-t-xl border-2 border-gray-100 dark:border-[#303339]">
                  <header className="flex justify-between items-center text-xl font-semibold px-5 w-full h-[50px] rounded-t-md bg-gray-100 text-gray-600 dark:bg-[#303339] dark:text-gray-400">
                    Description
                  </header>
                  {nft.description ? (
                    <p className="text-[1.2rem] p-5 text-gray-600 dark:text-gray-400">
                      {nft.description}
                    </p>
                  ) : (
                    <p className="text-[1.2rem] p-5">
                      The creator did not provide a description
                    </p>
                  )}
                </article>
              </div>
            </div>
          </div>
          <Comments nftId={nftId as string} />
        </div>
      </div>
      <Footer />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getNftById({ id: params?.id as string })
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
