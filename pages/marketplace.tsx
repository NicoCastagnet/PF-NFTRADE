/* eslint-disable @next/next/no-img-element */
import Footer from '@components/footer'
import SvgBitCoin from '@components/icons/svgBitCoin'
import SvgLike from '@components/icons/svgLike'
import SvgViews from '@components/icons/svgViews'
import NavBar from '@components/navbar'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from '@material-tailwind/react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Account {
  id: number
  user_name: string
}

interface Likes {
  likedBy: Account[]
  dislikedBy: Account[]
}

interface NFT {
  id: number
  name: string
  img: string
  creator: Account
  price: number
  likes: Likes
  views: number
}

const Marketplace: NextPage = () => {
  const user1: Account = {
    id: 1,
    user_name: 'AMonkeBusiness',
  }
  const user2: Account = {
    id: 2,
    user_name: '31CF9E',
  }
  const nft1: NFT = {
    id: 1,
    name: 'BoredApe',
    img: 'https://i.seadn.io/gae/MvrC60lPlvm2XKPQBbhnZ2_fXnORWZn6DkrfPQBPByyjcuZYCk9Gks92hGOOy86rEjczrImFe_nPq_IVFUpvWS0p1KhM2yft_yqcvA?auto=format&w=1000',
    creator: user1,
    price: 320,
    likes: {
      likedBy: [user1],
      dislikedBy: [user2],
    },
    views: 246,
  }
  const nft2: NFT = {
    id: 2,
    name: 'Punks Yacht Club',
    img: 'https://i.seadn.io/gae/dYwb9umj4_fFuy00iNyXYNfRWtSu2ytCFDFR-kNBK834_M0Zwf_s0mzMPhjh3WxA9MxHqiGyq4islr770KS6ukFbLyveNq42yJ-HNg?auto=format&w=1000',
    creator: user2,
    price: 280,
    likes: {
      likedBy: [user1, user2],
      dislikedBy: [],
    },
    views: 116,
  }

  const router = useRouter()

  const arrayNFT: NFT[] = [nft1, nft2]

  const [open, setOpen] = useState(0)

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value)
  }

  return (
    <div>
      <NavBar />
      <div className="w-full">
        <div className="flex justify-center h-auto mb-6">
          <Accordion
            className="flex flex-col items-center w-[50%] "
            open={open === 1}
          >
            <AccordionHeader
              className="flex justify-center p-2 items-center border-[1px] border-gray-400 rounded-[8px] hover:scale-[1.1] transition-all mb-2"
              onClick={() => handleOpen(1)}
            >
              {open === 1 ? <p>Close filters </p> : <p>Open Filters </p>}
            </AccordionHeader>
            <AccordionBody
              className={`p-6 h-auto border-[1px] border-gray-400 w-[300px] lg:w-[100vh] rounded-[15px] mt-2 ${
                open === 0 && 'invisible'
              }`}
            >
              <h4 className="text-[1.2rem] font-[600] mb-4">Filters:</h4>
              <div className="w-full flex flex-wrap justify-between mb-4">
                <div className="w-[47%]">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select a category
                  </label>
                  <select
                    id="countries"
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option selected>All</option>
                    <option value="Music">Music</option>
                    <option value="Art">Art</option>
                    <option value="Sports">Sports</option>
                    <option value="Abstract">Abstract</option>
                  </select>
                </div>
                <div className="w-[47%]">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select a category
                  </label>
                  <select
                    id="countries"
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option selected>All</option>
                    <option value="Music">Music</option>
                    <option value="Art">Art</option>
                    <option value="Sports">Sports</option>
                    <option value="Abstract">Abstract</option>
                  </select>
                </div>
              </div>
              <div className="w-full flex flex-wrap justify-between mb-4">
                <div className="w-[47%]">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select a category
                  </label>
                  <select
                    id="countries"
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option selected>All</option>
                    <option value="Music">Music</option>
                    <option value="Art">Art</option>
                    <option value="Sports">Sports</option>
                    <option value="Abstract">Abstract</option>
                  </select>
                </div>
                <div className="w-[47%]">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Select a category
                  </label>
                  <select
                    id="countries"
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option selected>All</option>
                    <option value="Music">Music</option>
                    <option value="Art">Art</option>
                    <option value="Sports">Sports</option>
                    <option value="Abstract">Abstract</option>
                  </select>
                </div>
              </div>
              <hr className=" bg-slate-200 h-[2px]" />
              <h4 className="text-[1.2rem] font-[600] my-4">Orders:</h4>
              <div className="w-full flex flex-wrap justify-between mb-2">
                <div className="w-[47%]">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Sort by:
                  </label>
                  <select
                    id="countries"
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option selected>All</option>
                    <option value="Music">Likes</option>
                    <option value="Art">Price</option>
                    <option value="Sports">Views</option>
                  </select>
                </div>
                <div className="w-[47%]">
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Way:
                  </label>
                  <select
                    id="countries"
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option selected>Upward</option>
                    <option value="Music">Downward</option>
                  </select>
                </div>
              </div>
            </AccordionBody>
          </Accordion>
        </div>
        <div className="flex flex-col items-center lg:flex-row lg:flex-wrap lg:justify-center">
          {arrayNFT.map((nft) => (
            <div
              key={nft.id}
              className="flex flex-col border-[1px] border-gray-400 rounded-[15px] w-[80%] p-[4%] mb-8 cursor-pointer hover:scale-[1.05] transition-all lg:w-[300px] lg:p-6 lg:mx-6"
              onClick={() => router.push(`/productdetails/${nft.id}`)}
            >
              <h4 className="text-[1.8rem] font-[600] mb-2">{nft.name}</h4>
              <div className="w-full flex justify-center">
                <img
                  src={nft.img}
                  alt={`${nft.name} NFT`}
                  className="w-full rounded-[15px]"
                />
              </div>
              <hr className="w-full my-2 h-[2px] bg-gray-400" />
              <div className="flex justify-between">
                <div>
                  <span className="mr-1">By:</span>
                  <span className="font-[500] cursor-pointer hover:text-slate-600">
                    {nft.creator.user_name}
                  </span>
                </div>
                <div className="flex items-center">
                  <SvgBitCoin width={22} height={22} />
                  <p className="text-[1.2rem]">{nft.price}</p>
                </div>
              </div>
              <div className="flex justify-evenly items-end my-6">
                <div className="flex">
                  <div className="w-[28px] mr-2">
                    <SvgLike />
                  </div>
                  <p className="text-[1.2rem]">{nft.likes.likedBy.length}</p>
                </div>
                <div className="flex justify-center items-center">
                  <div className="w-[30px] mr-2">
                    <SvgViews />
                  </div>
                  <p className="text-[1rem]">{nft.views}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Marketplace
