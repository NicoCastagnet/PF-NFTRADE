import fetcher from '@lib/fetcher'
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import type { NftDetailResponse } from 'types/api-responses'
import SvgHeart  from '@components/icons/svgHeart'
import SvgCoin  from '@components/icons/svgCoin'
import SvgViews  from '@components/icons/svgViews'
import NavBar from '@components/navbar/navbar'
import Footer from '@components/footer'



interface NftDetailProps {
  nft: NftDetailResponse
}

const NftDetail: NextPage<NftDetailProps> = ({ nft }) => {
  console.log('es esto => ',nft)
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <NavBar/>

      <div className='bg-zinc-800 rounded-2xl flex flex-row py-12 px-10 my-[10rem]'>

      {/* ---------------------------------------------------------------- */}
      <div className='flex justify-center items-center'>
        <Image src={nft.image} quality={50} height={500} width={450} alt={nft.name} className='rounded-2xl'/>
      </div>

      {/* -------------------------------------------------------------- */}

      <div className='flex flex-col items-center justify-center px-8 text-white'>

        <div className='flex flex-row text-2xl font-medium'>
          <h2>NFTRADE | </h2>
          <h1>&nbsp;{nft.name.toLocaleUpperCase()}</h1>
        </div>

        <div className='flex flex-row justify-start text-sm w-full font-medium'>
          <span># {nft.id}</span>
        </div>

        <div className='flex flex-row justify-between w-full my-6 text-base'>
          <div>
          <span>Owner.{nft.owner.name} </span>
          </div>
            <div className='flex flex-row justify-center items-center gap-2'>
              <SvgViews height={18} width={18} fill={'#FFF'}/>
              <span>{nft._count.viewedBy}</span>
              <span>views</span>
            </div>
        </div>


        <div className='flex flex-row justify-between w-full py-4'>

          <div className=' text-2xl' >
            <p>Actual price</p>
            <div className='flex flex-row justify-start items-center gap-2'>
            <SvgCoin height={28} width={28} />
            <span>{nft.price}</span> </div>
            </div>
          <div className='flex flex-col justify-end'>
            <div className='flex flex-row justify-center items-center gap-2'>
              <span className=''>
              <SvgHeart />
              </span>
            <span>{nft._count.likedBy}</span>
            </div>
          </div>

        </div>
        <div className='flex justify-center items-center py-6'>
          <Link href={'#'}>
          <button className='text-2xl bg-gray-600 py-3 px-20 rounded-xl'>
            ADD TO CART
          </button>
          </Link>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      </div>

      <Footer/>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await fetcher(`http://localhost:3000/api/nfts/${params?.id}`)
  return {
    props: {
      nft: data,
    },
  }
}

export default NftDetail
