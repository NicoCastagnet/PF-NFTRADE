import Footer from '@components/footer'
import SvgCheck from '@components/icons/svgCheck'
import SvgCoin from '@components/icons/svgCoin'
import SvgViews from '@components/icons/svgViews'
import NavBar from '@components/navbar/navbar'
import Comments from '@components/nftDetail/comments'
import getNftById from '@lib/api/nfts/getById'
import { useCart } from 'context/cart'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ChangeEvent, useEffect, useState } from 'react'

import SvgLoading from '@components/icons/svgLoading'
import SvgPencil from '@components/icons/svgPencil'
import SvgPlus from '@components/icons/svgPlus'
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
  const user = session?.user

  useEffect(() => {
    async function putViews() {
      await fetch('/api/put/nftViews', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          nftId: nft.id,
        }),
      })
    }
    if (user) putViews()
    if (nft.wishedBy.includes(user?.id)) {
      setWishlisted(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nft.id, user?.id])

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

    if (nft.wishedBy.includes(user?.id)) {
      setWishlisted(false)
      nft.wishedBy = nft.wishedBy.filter((w) => w !== user?.id)
    } else {
      nft.wishedBy.push(user?.id)
      setWishlisted(true)
    }
    await fetch('/api/put/wishes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nftId: nft.id,
        userId: user?.id,
      }),
    })
    setWishAdvice(false)
    setLoadingWish(false)
  }

  const [wishAdvice, setWishAdvice] = useState(false)

  const [published, setPublished] = useState(nft.published)

  const [loadingPublished, setLoadingPublished] = useState(false)

  console.log(published)

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

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <NavBar />
      <div className="bg-zinc-800 rounded-2xl  flex flex-row py-12 mt-[10rem] mb-[5rem] h-[620px] w-[1200px] justify-around items-center ">
        <div className="flex justify-center items-center w-[500px]">
          <Image
            src={nft.image}
            alt={`img-${nft.name}`}
            className="rounded-2xl object-cover"
            quality={50}
            width={1000}
            height={1000}
          />
        </div>
        <div className=" flex flex-col items-start justify-between w-[40%]  h-[95%] text-gray-100  ">
          <div className="mb-6 w-full  flex justify-between items-start">
            <div>
              <div className="flex flex-row text-[2rem] font-medium">
                <h1>{nft.name.toLocaleUpperCase()}</h1>
              </div>
              <div className="flex flex-row justify-start text-[1rem] w-full font-medium">
                <span>
                  #
                  {nft.id.toUpperCase().slice(nft.id.length - 4, nft.id.length)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            {categories.map((c) => (
              <span className=" text-[1.4rem] mr-2" key={c}>
                #{c}
              </span>
            ))}
          </div>
          <div className="flex flex-row justify-between w-full my-6 text-[1.2rem]">
            <div className=" flex ">
              <span>Owner: </span>
              <Link href={`/users/${nft.owner.id}`}>
                <span className="ml-2 font-[700] hover:text-gray-300 cursor-pointer">
                  {nft.owner.name}
                </span>
              </Link>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <SvgViews height={18} width={18} fill={'#FFF'} />
              <span>{nft._count.viewedBy}</span>
              <span>views</span>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full py-4">
            <div>
              <div className="flex">
                <p className="text-[1.5rem] mb-2">Actual price</p>
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
              <div className=" text-[1.3rem] flex flex-row justify-start items-center gap-2">
                <SvgCoin height={24} width={24} />
                {priceToEdit === true ? (
                  <div className="flex">
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => handlePrice(e)}
                      className="w-[80px] h-[30px] bg-zinc-800 border-b-[1px] placeholder:${price} focus:ring-blue-500 text-[1.1rem] focus:border-blue-500 block w-full p-1"
                    ></input>

                    <button
                      className={`hover:fill-slate-400 fill-slate-300 disabled:fill-red-800 cursor-pointer disabled:cursor-not-allowed`}
                      onClick={putPrice}
                      disabled={price <= 0 || price > 9999}
                    >
                      <SvgCheck className="ml-2" height={30} width={30} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>{price}</span>
                    {user?.id === nft.owner.id && (
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
            <Likes nftId={nftId as string} />
          </div>
          <div className="flex flex-row">
            {loadingWish ? (
              <div className="animate-spin flex justify-center items-center w-[40px] h-[40px] mt-2 rounded-full">
                <SvgLoading />
              </div>
            ) : (
              <div className="flex w-[240px] items-center">
                <button
                  onMouseOver={() => setWishAdvice(true)}
                  onMouseOut={() => setWishAdvice(false)}
                  onClick={addToWished}
                  className={`fill-slate-200 ${
                    wishlisted === true && ' fill-green-600 '
                  } hover:fill-slate-300 bg-zinc-700 flex justify-center items-center w-[40px] h-[40px] rounded-full `}
                >
                  <SvgPlus className="w-[30px] h-[30px] " />
                </button>
                {wishAdvice === true && (
                  <span className="w-auto p-4 h-[30px] bg-zinc-900 flex justify-center items-center rounded-[12px] transition-all ml-2">
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
          {nft.owner.id === user?.id ? (
            loadingPublished ? (
              <div className="animate-spin flex justify-center items-center w-full h-[50px] mt-2 rounded-full">
                <SvgLoading className="w-[40px] h-[40px] " />
              </div>
            ) : published === false ? (
              <div className="flex w-full ">
                <span
                  onClick={() => handlePublished(true)}
                  className=" text-center cursor-pointer text-2xl transition-all font-[600] p-3 bg-green-800 hover:scale-[1.1] rounded-xl w-full"
                >
                  ADD TO MARKET
                </span>
              </div>
            ) : (
              <div className="flex w-full ">
                <span
                  onClick={() => handlePublished(false)}
                  className=" text-center cursor-pointer text-2xl transition-all font-[600] p-3 bg-red-800 hover:scale-[1.1] rounded-xl w-full"
                >
                  REMOVE FROM MARKET
                </span>
              </div>
            )
          ) : published === false ? (
            <div className="flex py-6 w-full ">
              <span className="text-[1.2rem] text-center text-gray-400 italic p-4 bg-gray-600 rounded-xl w-full">
                This product is not for sale at this time
              </span>
            </div>
          ) : (
            <div className="flex justify-center items-center py-6 w-full ">
              <button
                className="text-2xl bg-blue-600 p-3 font-[600] px-20 rounded-xl w-full hover:scale-[1.1] transition-all"
                onClick={() => {
                  addItem(nft)
                  cart.find((e) => e.name === nft.name)
                    ? toast.error(
                        'You have already added this NFT to the cart!',
                      )
                    : toast.success('NFT added to the cart!')
                }}
              >
                ADD TO CART
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 border-[1px] w-[1200px] min-h-[300px] border-gray-400 p-3 lg:mt-0 overflow-auto rounded-[15px] mb-8">
        <h3 className="text-[1.8rem] font-[500]">Description:</h3>
        {nft.description ? (
          <p className="text-[1.2rem]">{nft.description}</p>
        ) : (
          <p className="text-[1.2rem] lg:text-[1.4rem]">
            The creator did not provide a description
          </p>
        )}
      </div>

      <Comments nftId={nftId as string} />

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
