import NFT from '@assets/chain.png'
import Newsletter from '@assets/newsletter.png'
import NFT2 from '@assets/NFT_5.png'
import Footer from '@components/footer'
import SvgBag from '@components/icons/svgBag'
import SvgCollection from '@components/icons/svgCollection'
import SvgList from '@components/icons/svgList'
import NavBar from '@components/navbar'
import type { NextPage } from 'next'
import Image from 'next/image'
import SvgMail from '../components/icons/svgMail'

const HomePage: NextPage = () => {
  return (
    <>
      <NavBar />
      <section className="home__header bg-slate-900 text-white p-8 flex justify-between">
        <div className="right">
          <h1 className="home__title font-bold text-7xl w-[44rem] tracking-wider">
            Explore our digital{' '}
            <span className="home__title-span font-extrabold text-blue-600">
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
          <div className="statistics flex text-center justify-between w-80 mt-8">
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
      <section className="home__utils flex flex-col items-center">
        <p className="text-3xl font-bold m-16 tracking-wide">
          Create, buy & sell your NFTs
        </p>
        <div className="home__utils-container flex items-center justify-evenly bg-slate-900 h-96 w-11/12 rounded-lg mb-5">
          <div className="box1 bg-slate-600 h-60 w-96 rounded-lg p-6">
            <div className="icon flex justify-center items-center bg-blue-600 h-[3.3rem] w-[3.3rem] rounded-full">
              <SvgBag fill="#fff" height="19" width="19" />
            </div>
            <div className="content">
              <p className="text-white font-semibold mt-3">Buy your NFTs</p>
              <p className="text-slate-400 mt-3 mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2 px-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buy now
              </button>
            </div>
          </div>
          <div className="box2 bg-slate-600 h-60 w-96 rounded-lg p-6">
            <div className="icon flex justify-center items-center bg-blue-600 h-[3.3rem] w-[3.3rem] rounded-full">
              <SvgCollection fill="#fff" height="19" width="19" />
            </div>
            <div className="content">
              <p className="text-white font-semibold mt-3">
                Create your collections
              </p>
              <p className="text-slate-400 mt-3 mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2 px-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create
              </button>
            </div>
          </div>
          <div className="box3 bg-slate-600 h-60 w-96 rounded-lg p-6">
            <div className="icon flex justify-center items-center bg-blue-600 h-[3.3rem] w-[3.3rem] rounded-full">
              <SvgList fill="#fff" height="19" width="19" />
            </div>
            <div className="content">
              <p className="text-white font-semibold mt-3">
                List them for sell
              </p>
              <p className="text-slate-400 mt-3 mb-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2 px-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Sell now
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="home__about flex items-center w-11/12 m-16">
        <div className="home__about-right">
          <Image src={NFT2} alt="nft2_img" height={850} width={890} />
        </div>
        <div className="home__about-left ml-16">
          <p className="left-title text-5xl font-bold tracking-wide">
            Why choosing us?
          </p>
          <p className="mt-10 mb-10">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            molestiae doloribus voluptatibus. Laudantium, reiciendis! Architecto
            illo commodi natus maxime fugiat cupiditate, et ducimus similique
            earum exercitationem, sit dolorem asperiores expedita!
          </p>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2 px-7 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
          </button>
        </div>
      </section>
      <section className="home__newsletter flex flex-row-reverse items-center w-11/12 m-16">
        <div className="home__about-right bg-blue-500 rounded-full">
          <Image src={Newsletter} alt="nft2_img" height={850} width={890} />
        </div>
        <div className="home__about-left">
          <p className="left-title text-5xl font-bold tracking-wide w-4/5">
            Subscribe to receive all the{' '}
            <span className="font-extrabold text-blue-600 uppercase">news</span>{' '}
            and{' '}
            <span className="font-extrabold text-blue-600 uppercase">
              offers
            </span>{' '}
            daily!
          </p>
          <p className="mt-10 mb-10 w-4/5">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            molestiae doloribus voluptatibus. Laudantium, reiciendis! Architecto
            illo commodi natus maxime fugiat cupiditate, et ducimus similique
            earum exercitationem, sit dolorem asperiores expedita!
          </p>
          <form>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <SvgMail fill="#fff" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 w-4/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter your e-mail"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-[12rem] bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default HomePage
