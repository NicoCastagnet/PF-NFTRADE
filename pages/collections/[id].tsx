// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import SvgLoading from '@components/icons/svgLoading'
import SvgTrash from '@components/icons/svgTrash'
import NavBar from '@components/navbar/navbar'
import { useCart } from '@context/cart'
import getCollectionById from '@lib/api/collections/getCollectionById'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { RiVipCrownFill } from 'react-icons/ri'
import type { CollectionDetailResponse } from 'types/api-responses'

interface Props {
  collection: CollectionDetailResponse
}

const CollectionDetail: NextPage<Props> = ({ collection }) => {
  const { data: session } = useSession()
  const { cart, addItem } = useCart()
  const router = useRouter()
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
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
  })

  const [loadingPublished, setLoadingPublished] = useState(false)

  const [published, setPublished] = useState(collection.published)

  async function handlePublished(boolean: boolean) {
    const nftsId = collection.nfts.map((nft) => nft.id)
    setLoadingPublished(true)
    setPublished(boolean)

    await fetch('/api/put/published', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nftsId: nftsId,
        published: boolean,
      }),
    }).then((r) => console.info(r))
    await fetch('/api/put/publishedCollection', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collectionId: collection.id,
        published: boolean,
      }),
    }).then((r) => console.info(r))
    setLoadingPublished(false)
  }

  const [deleteWarning, setDeleteWarning] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  async function deleteNft() {
    setDeleteLoading(true)
    const nftsId = collection.nfts.map((nft) => nft.id)
    await fetch('/api/put/collectionPutErased', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: collection.id,
        nftsId: nftsId,
      }),
    })
    setDeleteLoading(false)
    router.push(`/`)
  }

  return (
    <div className="bg-gray-200 dark:bg-[#202225] flex flex-col items-center justify-around w-full min-h-screen transition-all">
      <NavBar />
      <div className=" mt-[120px] w-full">
        <div className="w-full flex flex-col justify-center items-center">
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
              <p className="text-[1.2rem] mb-8">{`Are you sure you want to delete ${collection.name}? this action will be permanent`}</p>
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
            className={` w-[85%]  sm:w-[80%] ${
              deleteWarning === true && 'blur-[10px] opacity-40'
            } `}
          >
            <div className="flex flex-col lg:flex-row items-center justify-center w-full mb-[50px] ">
              <div className="lg:mr-10 ">
                <header className="flex justify-between items-center px-5 sm:w-[505px] w-[300px] h-[55px] rounded-t-md bg-gray-100 dark:bg-[#303339]">
                  <p className="text-gray-600 dark:text-gray-400 text-[0.8rem] sm:text-[1rem]">
                    #{collection.id.toUpperCase()}
                  </p>
                  {(session?.user.id === collection.owner.id ||
                    admin === true) && (
                    <SvgTrash
                      onClick={() => setDeleteWarning(true)}
                      className={` ml-4 w-[25px] h-[25px] fill-slate-500 ${
                        admin === true && 'hover:fill-yellow-500'
                      } hover:fill-red-800 cursor-pointer`}
                    />
                  )}
                </header>
                <div className="w-[300px] h-[300px]  sm:w-[505px]  sm:h-[505px] border-2 border-gray-100 dark:border-[#303339]">
                  <Image
                    src={collection.image}
                    alt={`img-${collection.name}`}
                    className=" object-cover"
                    quality={50}
                    width={1000}
                    height={1000}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-between text-gray-600 dark:text-white mt-5 sm:ml-5 sm:my-10 ">
                <div className="arriba  w-full">
                  <h5 className="text-4xl font-bold">
                    {collection.name} #{collection.id.slice(0, 5).toUpperCase()}
                  </h5>

                  <div className="flex items-center justify-start my-10">
                    <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold mr-5">
                      Property of{' '}
                      <span className="text-blue-500 hover:underline hover:text-blue-600 cursor-pointer">
                        <Link href={`/users/${collection.owner.id}`}>
                          {collection.owner.name}
                        </Link>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex ">
                  <div className="flex mr-3">
                    <p className="text-[1.5rem]">Actual price</p>
                  </div>
                  <div className=" text-[1.3rem] flex flex-row justify-start items-center gap-2">
                    <SvgCoin height={24} width={24} />
                    <span>{collection.price}</span>
                    {collection.discount > 0 && (
                      <span className=" text-[1rem] p-1 bg-red-800 rounded-[15px] ">
                        {' '}
                        -{collection.discount} %{' '}
                      </span>
                    )}
                  </div>
                </div>
                <div className="buttons flex justify-center items-center mt-[53px] mb-[43px] max-w-[590px]">
                  {collection.owner.id === session?.user.id ? (
                    loadingPublished ? (
                      <div className="animate-spin flex justify-center items-center w-full h-[82px] mt-2 rounded-full">
                        <SvgLoading className="w-[40px] h-[40px] " />
                      </div>
                    ) : published === false ? (
                      <div className="flex w-full ">
                        <button
                          onClick={() => handlePublished(true)}
                          className="text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all w-full min-h-[90px] py-3 px-20 rounded-xl"
                        >
                          Add to market
                        </button>
                      </div>
                    ) : (
                      <div className="flex w-full ">
                        <button
                          onClick={() => handlePublished(false)}
                          className="text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all w-full min-h-[90px] py-3 px-20 rounded-xl"
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
                  ) : (
                    <div className="flex items-center py-6 w-full ">
                      <button
                        className="text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all w-[100%] min-h-[90px] py-3 px-20 rounded-xl"
                        onClick={() => {
                          addItem(collection)
                          cart.find((e) => e.name === collection.name)
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
                  {session?.user.id !== collection.owner.id &&
                    published === true && (
                      <Link href={'#'}>
                        <button className="text-xl w-[50%] min-h-[90px] text-white bg-blue-600 hover:bg-blue-500 hover:drop-shadow-lg transition-all py-3 px-20 mx-2 rounded-xl">
                          Buy now
                        </button>
                      </Link>
                    )}

                  {/* //dev */}
                </div>
                <article className="abajo mt-6 w-full sm:w-full min-h-[285px] lg:mt-0 rounded-t-xl border-2 border-gray-100 dark:border-[#303339]">
                  <header className="flex justify-between items-center text-xl font-semibold px-5 w-full h-[50px] rounded-t-md bg-gray-100 text-gray-600 dark:bg-[#303339] dark:text-gray-400">
                    Description
                  </header>
                  <p className="text-[1.2rem] p-5 text-gray-600 dark:text-gray-400">
                    {collection.description}
                  </p>
                </article>
              </div>
            </div>

            <div className=" flex flex-col justify-center items-center  w-full">
              <div className=" flex lg:w-[1000px] lg:mt-[100px]">
                <h2 className=" text-[1.5rem]  font-[500] text-gray-300 mb-4 ">
                  This collection contains the following products:
                </h2>
              </div>

              <div className="flex justify-center w-[100%] mb-10  ">
                <div className="flex min-h-[900px] px-3 pb-0 pt-3  border-[1px] border-gray-400 rounded-[15px] w-full lg:min-w-[1000px] justify-center flex-wrap">
                  {collection.nfts.length > 0 &&
                    collection.nfts.map((el) => (
                      <div
                        key={el.id}
                        className={` mb-3 w-full sm:min-w-[284px] sm:mr-4 max-w-[287px] h-[380px] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group  dark:bg-stone-900 dark:border-[1px]   dark:border-gray-400  group shadow-lg shadow-zinc-500`}
                      >
                        <Link href={`/nfts/${el.id}`}>
                          <div>
                            <div className="rounded-xl border-spacing-2 ">
                              <Image
                                src={el.image}
                                height={300}
                                width={400}
                                quality={20}
                                alt={`image-${el.name}`}
                                className="rounded-t-xl object-cover group-hover:scale-110 transition duration-300 ease-in-out overflow-auto"
                              />
                            </div>
                            <div className="flex flex-col p-4 w-full justify-between ">
                              <div className="flex flex-col gap-2">
                                <div className="flex flex-row w-full justify-between">
                                  <h5
                                    className={`text-xl text-white font-bold truncate ease duration-300`}
                                  >
                                    {el.name}
                                  </h5>
                                </div>
                              </div>
                              <div className="flex flex-row justify-between items-center mb-6">
                                <div className="flex flex-row justify-center items-center gap-2">
                                  <span>
                                    <SvgCoin
                                      height={20}
                                      width={20}
                                      className={'fill-white'}
                                    />
                                  </span>
                                  <span className="text-white font-semibold text-xl">
                                    {el.price}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-2 truncate">
                                <span>
                                  <RiVipCrownFill className="fill-yellow-500" />
                                </span>
                                <p
                                  className={` text-lg text-gray-800 dark:text-white font-semibold  truncate ease duration-300`}
                                >
                                  {el.owner.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getCollectionById({ id: params?.id as string })
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      collection: data,
    },
  }
}

export default CollectionDetail
