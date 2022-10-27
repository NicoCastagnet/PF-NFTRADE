import NFT from '@assets/chain.png'
import Footer from '@components/footer'
import NavBar from '@components/navbar'
import type { NextPage } from 'next'
import Image from 'next/image'

const HomePage: NextPage = () => {
  return (
    <>
      <NavBar />
      <section className="home__header bg-slate-900 text-white p-8 flex justify-between">
        <div className="right">
          <h1 className="home__title font-bold text-7xl w-[39.5rem]">
            Explore our digital{' '}
            <span className="home__title-span font-extrabold text-sky-600">
              NFT
            </span>{' '}
            market place.
          </h1>
          <p className="w-[39.5rem] mb-10 mt-10">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
            vero minus ipsa dicta dignissimos obcaecati aspernatur ab quidem!
          </p>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-9 py-2.5 text-center mr-3 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Explore now
          </button>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 ml-3 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
            <span className="relative px-9 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0">
              Create NFT
            </span>
          </button>
          <div className="statistics flex text-center justify-between w-80">
            <div className="users flex flex-col font-bold text-2xl">
              40K
              <span className="mt-1 font-normal text-sm">Users</span>
            </div>
            <div className="NFTS flex flex-col font-bold text-2xl">
              150
              <span className="mt-1 font-normal text-sm">Nfts</span>
            </div>
            <div className="collections flex flex-col font-bold text-2xl">
              50
              <span className="mt-1 font-normal text-sm">Collections</span>
            </div>
          </div>
        </div>
        <div className="left">
          <Image src={NFT} alt="nft_img" height={450} width={450} />
        </div>
      </section>
      <section className="home__utils flex flex-col text-center items-center">
        <p className="text-3xl font-bold m-10">Create, buy & sell your NFTs</p>
        <div className="home__utils-container flex items-center justify-evenly bg-slate-900 h-96 w-5/6 rounded-lg mb-5">
          <div className="box1 bg-slate-500 h-60 w-80 rounded-lg">
            <div className="icon bg-blue-700 h-[3rem] w-[3rem] rounded-full"></div>
          </div>
          <div className="box2 bg-slate-500 h-60 w-80 rounded-lg"></div>
          <div className="box3 bg-slate-500 h-60 w-80 rounded-lg"></div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default HomePage
