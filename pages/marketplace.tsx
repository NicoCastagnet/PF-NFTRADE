/* eslint-disable @next/next/no-img-element */
import Footer from '@components/footer'
import SvgBitCoin from '@components/icons/svgBitCoin'
import NavBar from '@components/navbar'
import type { NextPage } from 'next'
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

  const arrayNFT: NFT[] = [nft1, nft2]

  return (
    <div>
      <NavBar />
      <div className="w-full">
        {arrayNFT.map((nft) => (
          <div
            key={nft.id}
            className="flex flex-col border-[1px] w-[80%] p-[4%]"
          >
            <h4 className="text-[1.8rem] font-[600]">{nft.name}</h4>
            <div className="w-full flex justify-center">
              <img
                src={nft.img}
                alt={`${nft.name} NFT`}
                className="w-56 rounded-[15px]"
              />
            </div>
            <span>{`By ${nft.creator.user_name}`}</span>
            <div className="flex items-center">
              <h5>{nft.price}</h5>
              <SvgBitCoin />
            </div>
            <div>
              <p>{`Likes: ${nft.likes.likedBy.length}`}</p>
              <p>{`Views: ${nft.views}`}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Marketplace
