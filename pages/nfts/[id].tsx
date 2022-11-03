import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import SvgHeart from '@components/icons/svgHeart'
import SvgTrash from '@components/icons/svgTrash'
import SvgViews from '@components/icons/svgViews'
import NavBar from '@components/navbar/navbar'
import getNftById from '@lib/api/nfts/getById'
import { useCart } from 'context/cart'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { useEffect, useState } from 'react'

import { toast, Toaster } from 'react-hot-toast'

import type { NftDetailResponse } from 'types/api-responses'

interface NftDetailProps {
  nft: NftDetailResponse
}

const NftDetail: NextPage<NftDetailProps> = ({ nft }) => {
  const { cart, addItem } = useCart()
  const { data: session } = useSession()
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

  const [comment, setComment] = useState('')

  async function submitComment() {
    fetch('/api/put/commentPut', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.id,
        nftId: nft.id,
        content: comment,
      }),
    })

    nft.comments.push({
      user: {
        name: user?.name,
      },
      content: comment,
      isPublished: true,
    })

    setComment('')

    refreshStates()
  }

  async function deleteComment(id: string) {
    fetch('/api/put/commentDelete', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nftId: nft.id,
        commentId: id,
      }),
    })

    nft.comments = nft.comments.filter((c) => c.id !== id)
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

      <div className="mb-8">
        <div className="w-[1200px] border-[1px] border-gray-400 rounded-[15px] p-4 mb-4">
          <h3 className="text-[1.4rem]">Comments:</h3>
          <div className="h-[400px] overflow-auto">
            {nft.comments.length > 0 ? (
              nft.comments.map(
                (c) =>
                  c.isPublished == true && (
                    <div
                      key={c.id}
                      className="border-[1px] border-gray-300 rounded-[15px] mt-2"
                    >
                      <div className="flex justify-between items-center bg-slate-100 rounded-[15px] h-[30px] rounded-bl-[0] rounded-br-[0]">
                        <div className="flex">
                          <p className="text-[1rem] mr-2 ml-2">From: </p>
                          <p className="text-[1rem] font-[500] hover:text-slate-600 cursor-pointer">
                            {c.user.name}
                          </p>
                        </div>
                        {c.user.id === user?.id && (
                          <button
                            className="mr-3 hover:fill-red-600"
                            onClick={() => deleteComment(c.id)}
                          >
                            <SvgTrash width={18} height={18} />
                          </button>
                        )}
                      </div>
                      <hr />
                      <div className="p-2">
                        <p className="text-[1rem] lg:text-[1rem] ml-2">
                          {c.content}
                        </p>
                      </div>
                    </div>
                  ),
              )
            ) : (
              <span> There are no comments yet </span>
            )}
          </div>
        </div>

        {user && (
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Write a comment
            </label>
            <textarea
              id="message"
              rows={4}
              className="resize-none block p-2.5 w-full text-[1rem] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Your message..."
              maxLength={400}
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
            <button
              onClick={submitComment}
              className="border-[1px] border-gray-300 rounded-[10px] mt-2 p-2 bg-orange-400 hover:bg-orange-500 transition-all"
            >
              Comment
            </button>
          </div>
        )}
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
