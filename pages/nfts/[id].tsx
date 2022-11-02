import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import SvgHeart from '@components/icons/svgHeart'
import SvgViews from '@components/icons/svgViews'
import NavBar from '@components/navbar/navbar'
import getNftById from '@lib/api/nfts/getById'
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { NftDetailResponse } from 'types/api-responses'

interface NftDetailProps {
  nft: NftDetailResponse
}

const comment1 = {
  id: 1,
  content: 'Hola como estas',
  from_account: { user_name: 'Matias' },
}

const comment2 = {
  id: 2,
  content: 'Zzz',
  from_account: { user_name: 'Pablo' },
}

const comments = [comment1, comment2]

const NftDetail: NextPage<NftDetailProps> = ({ nft }) => {
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
                <span className="">
                  <SvgHeart />
                </span>
                <span>{nft._count.likedBy}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center py-6">
            <Link href={'#'}>
              <button className="text-2xl bg-gray-600 py-3 px-20 rounded-xl">
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

      <div className="w-[1200px] border-[1px] border-gray-400 rounded-[15px] p-4 mb-8">
        <h3 className="text-[1.4rem]">Comments:</h3>
        <div className="h-[400px] overflow-auto">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div
                key={c.id}
                className="border-[1px] border-gray-300 rounded-[15px] mt-2"
              >
                <div className="flex bg-slate-100 rounded-[15px] rounded-bl-[0] rounded-br-[0]">
                  <p className="text-[1rem] mr-2 ml-2">From: </p>
                  <p className="text-[1rem] font-[500] hover:text-slate-600 cursor-pointer">
                    {c.from_account.user_name}
                  </p>
                </div>
                <hr />
                <div className="p-2">
                  <p className="text-[1rem] lg:text-[1.2rem] ml-2">
                    {c.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <span> There are no comments yet </span>
          )}
        </div>
      </div>

      <Footer />
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
