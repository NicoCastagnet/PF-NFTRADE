import SvgBag from '@components/icons/svgBag'
import SvgCollection from '@components/icons/svgCollection'
import SvgList from '@components/icons/svgList'
import Link from 'next/link'

const UtilsContainer = () => {
  return (
    <section className="home__utils flex flex-col items-center">
      <p className="text-5xl font-bold py-16 px-64 tracking-wide">
        Create, buy & sell your NFTs
      </p>
      <div className="home__utils-container flex items-center justify-evenly bg-slate-900 h-96 w-auto rounded-lg mb-16">
        <div className="box1 bg-slate-600 h-60 w-96 rounded-lg p-6 m-16">
          <div className="icon flex justify-center items-center bg-blue-600 h-[3.3rem] w-[3.3rem] rounded-full">
            <SvgBag fill="#fff" height="19" width="19" />
          </div>
          <div className="content">
            <p className="text-white font-semibold mt-3">Buy your NFTs</p>
            <p className="text-slate-400 mt-3 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <Link href="/marketplace">
              <button
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600 font-medium rounded-full text-sm py-2 px-7 text-center"
              >
                Buy now
              </button>
            </Link>
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
              className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600 font-medium rounded-full text-sm py-2 px-7 text-center"
            >
              Create
            </button>
          </div>
        </div>
        <div className="box3 bg-slate-600 h-60 w-96 rounded-lg p-6 m-16">
          <div className="icon flex justify-center items-center bg-blue-600 h-[3.3rem] w-[3.3rem] rounded-full">
            <SvgList fill="#fff" height="19" width="19" />
          </div>
          <div className="content">
            <p className="text-white font-semibold mt-3">List them for sell</p>
            <p className="text-slate-400 mt-3 mb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600 font-medium rounded-full text-sm py-2 px-7 text-center"
            >
              Sell now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UtilsContainer
