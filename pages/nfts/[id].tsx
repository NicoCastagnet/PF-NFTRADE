import Footer from '@components/footer'
import SvgViews from '@components/icons/svgViews'
import NavBar from '@components/navbar/navbar'
import getNftById from '@lib/api/nfts/getById'
import { useCart } from 'context/cart'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useEffect } from 'react'

import Comments from '@components/nftDetail/comments'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nft.id, user?.id])

  return (
    <div className="bg-gray-200 dark:bg-[#202225] flex flex-col items-center justify-around w-full min-h-screen transition-all">
      <NavBar />
      <div className="flex flex-col">
        <div className="flex flex-row py-12 px-12 mt-14 h-full w-full justify-center">
          <article>
            <header className="flex justify-between items-center px-5 w-[600px] h-[55px] rounded-t-md bg-gray-100 dark:bg-[#303339]">
              <p className="text-gray-600 dark:text-gray-400">
                #{nft.id.toUpperCase()}
              </p>
              <Likes nftId={nftId as string} />
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
          </article>
          <div className="flex flex-col items-center justify-between text-gray-600 dark:text-white my-5 ml-5">
            <div className="arriba w-full">
              <h5 className="text-4xl font-bold">
                {nft.name} #{nft.id.slice(0, 5).toUpperCase()}
              </h5>
              <div className="flex items-center justify-start my-10">
                <p className="text-xl text-gray-600 dark:text-gray-400 font-semibold mr-5">
                  Property of{' '}
                  <span className="text-blue-500 hover:underline hover:text-blue-600 cursor-pointer">
                    <Link href={`/users/${nft.owner.id}`}>
                      {nft.owner.name}
                    </Link>
                  </span>
                </p>
                <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold text-lg mr-5">
                  <SvgViews className="w-7 h-7 fill-gray-600 dark:fill-gray-400 mr-2" />
                  {nft._count.viewedBy} views
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400 font-semibold text-lg mr-5">
                  <Likes nftId={nftId as string} />
                  <p className="mx-2">likes</p>
                </div>
              </div>
              <div className="flex text-gray-600 dark:text-gray-400 items-center text-xl">
                Product price
                <span className="text-xl font-bold mx-2">{nft.price}</span>{' '}
                coins
              </div>
            </div>
            <div>
              <div className="buttons flex justify-center items-center my-10">
                <Link href={'#'}>
                  <button
                    className="text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all w-full py-3 px-20 rounded-xl mx-2"
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
                </Link>
                <Link href={'#'}>
                  <button className="text-xl w-full text-white bg-blue-600 hover:bg-blue-500 hover:drop-shadow-lg transition-all py-3 px-20 mx-2 rounded-xl">
                    Buy now
                  </button>
                </Link>
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
