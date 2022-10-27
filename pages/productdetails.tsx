/* eslint-disable @next/next/no-img-element */
import Footer from '@components/footer'
import SvgBitCoin from '@components/icons/svgBitCoin'
import SvgDislike from '@components/icons/svgDislike'
import SvgLike from '@components/icons/svgLike'
import SvgViews from '@components/icons/svgViews'
import NavBar from '@components/navbar'
import type { NextPage } from 'next'
import { useState } from 'react'

interface Account {
  id: number
  user_name: string
  avatar: string
}

interface Likes {
  likedBy: Account[]
  dislikedBy: Account[]
}

interface Sells {
  id: number
  price: number
  from_account: Account
  to_account: Account
  date: string
}

interface NFT {
  id: number
  name: string
  img: string
  description?: string
  creator: Account
  price: number
  date_of_creation: string
  owned_by?: Account
  sells: Sells[]
  likes: Likes
  views: number
}

const ProductDetails: NextPage = () => {
  const user1: Account = {
    id: 1,
    user_name: 'SirDavidAnderson',
    avatar:
      'https://i.seadn.io/gae/6QcEoUUYkAfjEmJIOaHfYheCYmyW5uDyNLa-jZf8Q3s3WUD_eT5-iSq3FvAT5OOiAd5AnPn4Eq-ENCB4EhmFv100VnHLy4F-EJ1jag?auto=format&w=1920',
  }

  const user2: Account = {
    id: 2,
    user_name: 'AMonkeBusiness',
    avatar:
      'https://i.seadn.io/gcs/files/dd3e16b0020740e01e3f6a1f631aadcc.jpg?auto=format&w=1920',
  }

  const user3: Account = {
    id: 3,
    user_name: 'Tuck13',
    avatar:
      'https://i.seadn.io/gcs/files/06c7dbad93343c8413989e431840e2f3.jpg?auto=format&w=1920',
  }

  const user4: Account = {
    id: 4,
    user_name: 'AudaciousBabes',
    avatar:
      'https://i.seadn.io/gae/wyUvz3tdf8Rp0MxI24Z9kp95UMt7h7Qj9O16RDihQMCIgIMxUjMklrz8naaAZ9LMtxIw0z7Nc_Lx0AsAAYyrfWgtd8MRZ4nzNMP-_OM?auto=format&w=1920',
  }

  const user5: Account = {
    id: 5,
    user_name: 'Jelvooooo',
    avatar:
      'https://storage.googleapis.com/opensea-static/opensea-profile/6.png',
  }

  const nft: NFT = {
    id: 1,
    name: 'BoredApe',
    img: 'https://i.seadn.io/gae/MvrC60lPlvm2XKPQBbhnZ2_fXnORWZn6DkrfPQBPByyjcuZYCk9Gks92hGOOy86rEjczrImFe_nPq_IVFUpvWS0p1KhM2yft_yqcvA?auto=format&w=1000',
    description:
      'Artsy Monke™ are original pieces of AI generated art featuring 20 different art themes. No two are alike. 10,000 completely unique Art NFTs. Commercial rights of each NFT belong to the current holder.',
    creator: user2,
    price: 320,
    date_of_creation: '10/5/2022',
    owned_by: user1,
    sells: [
      {
        id: 1,
        price: 280,
        from_account: user4,
        to_account: user3,
        date: '14/6/2022',
      },
      {
        id: 2,
        price: 300,
        from_account: user3,
        to_account: user1,
        date: '22/10/2022',
      },
    ],
    likes: {
      likedBy: [user1, user2, user3, user4],
      dislikedBy: [user5],
    },
    views: 124,
  }

  const [liked, setLiked] = useState({
    likes: nft.likes.likedBy.length,
    dislikes: nft.likes.dislikedBy.length,
    state: 'undef',
  })

  function likeHandler(value: string) {
    if (value === 'liked') {
      if (liked.state === 'disliked') {
        setLiked({
          likes: liked.likes + 1,
          dislikes: liked.dislikes - 1,
          state: 'liked',
        })
      }
      if (liked.state === 'undef') {
        setLiked({
          likes: liked.likes + 1,
          dislikes: liked.dislikes,
          state: 'liked',
        })
      }
    }
    if (value === 'disliked') {
      if (liked.state === 'liked') {
        setLiked({
          likes: liked.likes - 1,
          dislikes: liked.dislikes + 1,
          state: 'disliked',
        })
      }
      if (liked.state === 'undef') {
        setLiked({
          likes: liked.likes,
          dislikes: liked.dislikes + 1,
          state: 'disliked',
        })
      }
    }
  }

  console.log(liked)

  return (
    <div>
      <NavBar />
      <div className="flex flex-col justify-center items-center mb-10">
        <div className="flex flex-col items-center lg:items-start pb-4 lg:p-4 rounded-[15px] border-[1px] w-11/12 lg:w-10/12 border-gray-400">
          <div className="w-full lg:flex">
            <div className="flex flex-col items-center mt-4">
              <div>
                <img
                  src={nft.img}
                  alt={`${nft.name} NFT`}
                  className="w-64 lg:w-[100vh] rounded-[15px]"
                />
              </div>
              <hr className="w-[88%] mt-2 lg:w-0 h-0.5 bg-gray-400 my-1" />
            </div>
            <div className="w-full flex items-center  flex-col lg:items-start lg:ml-10">
              <div className="flex flex-row flex-wrap items-center justify-evenly w-[88%] lg:justify-between lg:flex-col lg:flex-nowrap lg:w-full lg:items-start h-full">
                <div>
                  <h1 className="text-[2.5rem] lg:text-[3.3rem] font-[700]">
                    {nft.name}
                  </h1>
                  <p className="text-[1.4rem] lg:text-[1.6rem] font-[600] text-gray-700">{`#${nft.id}`}</p>
                  <div className="flex flex-wrap mb-3">
                    <p className="text-[0.8rem] lg:text-[1rem] mr-2 text-gray-700">
                      Created by:
                    </p>
                    <p className="font-[500] text-[0.8rem] lg:text-[1rem] cursor-pointer hover:text-gray-600">
                      {nft.creator.user_name}
                    </p>
                  </div>
                </div>
                {nft.owned_by && (
                  <div className="flex mx-10 lg:mx-0">
                    <p className="text-[1.2rem] lg:text-[1.6rem] mr-2 text-gray-700">
                      Owner:
                    </p>
                    <p className="text-[1.2rem] lg:text-[1.6rem] cursor-pointer hover:text-gray-600">
                      {nft.owned_by.user_name}
                    </p>
                  </div>
                )}
                <div className="flex justify-end items-center flex-col lg:flex-row mt-6">
                  <div className=" fill-slate-900 w-[50px] flex mr-2">
                    <SvgViews />
                  </div>
                  <span className="text-[1.2rem] lg:text-[1.4rem]">
                    {nft.views}
                  </span>
                </div>
                <div className="mt-6">
                  <div className="flex justify-end items-center flex-col lg:flex-row">
                    <div>
                      <SvgBitCoin width={50} height={50} />
                    </div>
                    <span className="text-[1.2rem] lg:text-[1.4rem]">
                      {nft.price}
                    </span>
                  </div>
                </div>
                <div className="flex w-[220px] mt-3 justify-between p-4">
                  <div className="flex items-end">
                    <button
                      className={`w-[50%] mr-2 hover:fill-blue-600 ${
                        liked.state === 'liked' ? 'fill-black' : 'fill-blue-200'
                      }`}
                      onClick={() => likeHandler('liked')}
                    >
                      <SvgLike width={'100%'} />
                    </button>
                    <span className="text-[2rem] h-[42px] font-[400]">
                      {liked.likes}
                    </span>
                  </div>
                  <div className="flex items-end ml-6">
                    <button
                      className={`w-[50%] mr-2 hover:fill-blue-600 ${
                        liked.state === 'disliked'
                          ? 'fill-black'
                          : 'fill-blue-200'
                      }`}
                      onClick={() => likeHandler('disliked')}
                    >
                      <SvgDislike width={'100%'} />
                    </button>
                    <span className="text-[2rem] h-[42px] font-[400]">
                      {liked.dislikes}
                    </span>
                  </div>
                </div>
                <div className="flex mt-6 w-full justify-center items-center bg-yellow-500 rounded-[15px] cursor-pointer hover:bg-black hover:text-white hover:scale-[1.02] transition-all">
                  <h3 className="text-[2rem] lg:text-[2.4rem] font-[600]">
                    Add to cart
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-11/12 lg:w-10/12 lg:h-[400px] lg:mt-10 items-center lg:flex-row lg: justify-between">
          <div className="mt-6 border-[1px] w-full lg:w-[49%] h-[300px] lg:h-full border-gray-400 p-3 lg:mt-0 overflow-auto rounded-[15px]">
            <h3 className="text-[1.8rem] font-[500]">Description:</h3>
            {nft.description ? (
              <p className="text-[1.2rem]">{nft.description}</p>
            ) : (
              <p className="text-[1.2rem] lg:text-[1.4rem]">
                The creator did not provide a description
              </p>
            )}
          </div>
          <div className="flex w-full lg:w-[49%] lg:h-full flex-col p-3 mt-5 border-[1px] border-gray-400 mb-4 lg:mt-0 lg:mb-0 h-[300px] rounded-[15px]">
            <h3 className="text-[1.2rem] lg:text-[1.8rem] font-[600]">
              Sales activity:
            </h3>
            <div>
              <div className="flex justify-between">
                <span className="w-1/4 font-[600] text-[1rem] lg:text-[1.2rem]">
                  Date
                </span>
                <span className="w-1/4 font-[600] text-[1rem] lg:text-[1.2rem]">
                  Seller
                </span>
                <span className="w-1/4 font-[600] text-[1rem] lg:text-[1.2rem]">
                  Buyer
                </span>
                <span className="w-1/4 font-[600] text-[1rem] lg:text-[1.2rem]">
                  Price
                </span>
              </div>
              <div className="overflow-auto">
                {nft.sells.length === 0 ? (
                  <p className="text-[1.2rem]">No sales activity registred</p>
                ) : (
                  nft.sells.map((s) => (
                    <div
                      key={s.id}
                      className="flex justify-between mt-2 border-[1px]"
                    >
                      <span className="w-1/4 lg:overflow-hidden overflow-x-auto mr-4">
                        {s.date}
                      </span>
                      <span className="w-1/4 lg:overflow-hidden overflow-x-auto mr-4">
                        {s.from_account.user_name}
                      </span>
                      <span className="w-1/4 lg:overflow-hidden overflow-x-auto mr-4">
                        {s.to_account.user_name}
                      </span>
                      <span className="w-1/4 lg:overflow-hidden overflow-x-auto mr-4">
                        {s.price}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProductDetails
