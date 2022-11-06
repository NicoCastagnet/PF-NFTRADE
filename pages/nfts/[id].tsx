import Comments from '@components/comments'
import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import SvgHeart from '@components/icons/svgHeart'
import SvgViews from '@components/icons/svgViews'
import NavBar from '@components/navbar/navbar'
import getNftById from '@lib/api/nfts/getById'
import { useCart } from 'context/cart'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect, useState } from 'react'

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
    console.log('Change nft', nft.id)
    if (user) putViews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nft.id, user?.id])

  const categories = nft.categories.map((c) => c.name)

  const [reload, setReload] = useState(false)
  function refreshStates() {
    if (reload === false) {
      setReload(true)
    } else {
      setReload(false)
    }
  }

  let likes = nft.likedBy.map((acc) => acc.id)
  const likesNum = likes.length

  async function likeHandler() {
    if (user) {
      if (likes.includes(user?.id)) {
        likes = likes.filter((id) => id !== user?.id)
        nft.likedBy.pop()
      } else {
        likes.push(user?.id)
        nft.likedBy.push({ id: user?.id })
      }
    }
    fetch('/api/put/nftLike', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.id,
        nftId: nft.id,
      }),
    })
    refreshStates()
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <NavBar />
      <div className="bg-zinc-800 rounded-2xl flex flex-row py-12 mt-[10rem] mb-[5rem] h-[620px] w-[1200px] justify-around ">
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
        <div className="flex flex-col items-center justify-center px-8 text-white">
          <div className="flex flex-row text-2xl font-medium">
            <h1>{nft.name.toLocaleUpperCase()}</h1>
          </div>

          <div className="flex flex-row justify-start text-sm w-full font-medium">
            <span>#{nft.id.toUpperCase().slice(0, 4)}</span>
          </div>
          <div className="flex justify-between w-full">
            {categories.map((c) => (
              <span key={c}>#{c}</span>
            ))}
          </div>
          <div className="flex flex-row justify-between w-full my-6 text-base">
            <div>
              <span>Owner: {nft.owner.name} </span>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <SvgViews height={18} width={18} fill={'#FFF'} />
              <span>{nft._count.viewedBy}</span>
              <span>views</span>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full py-4">
            <div className=" text-2xl">
              <p>Actual price</p>
              <div className="flex flex-row justify-start items-center gap-2">
                <SvgCoin height={28} width={28} />
                <span>{nft.price}</span>{' '}
              </div>
            </div>
            <div className="flex flex-col justify-end">
              <div className="flex flex-row justify-center items-center gap-2">
                <span>{likesNum}</span>
                {user ? (
                  <SvgHeart
                    onClick={() => {
                      likeHandler()
                    }}
                    height={20}
                    width={20}
                    className={`${
                      likes.includes(user?.id) && 'fill-green-600'
                    } hover:fill-red-600 transition-all hover:cursor-pointer `}
                  />
                ) : (
                  <SvgHeart height={20} width={20} />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center py-6">
            <Link href={'#'}>
              <button
                className="text-2xl bg-gray-600 py-3 px-20 rounded-xl"
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
            </Link>
          </div>
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
