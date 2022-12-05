// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgList from '@components/icons/svgList'
import Link from 'next/link'

const List = () => {
  return (
    <div className="box1 bg-transparent border-2 border-slate-800 dark:bg-[#303339] dark:border-2 dark:border-zinc-600 hover:-translate-y-2 hover:shadow-lg h-64 max-sm:w-72 max-xl:w-72 max-lg:w-96 w-96 rounded-lg px-6 py-6 flex flex-col justify-center items-start  ease duration-500">
      <div className="icon flex justify-center items-center bg-blue-600 h-[3.3rem] w-[3.3rem] rounded-full">
        <SvgList fill="#fff" height="19" width="19" />
      </div>
      <div className="flex flex-col justify-between items-start h-full w-full">
        <div>
          <p className="text-white font-semibold mt-3">List them for sell</p>
          <p className="text-gray-400 mt-2 mb-2">
            Post all your NFT&apos;s start getting money.
          </p>
        </div>
        <Link href="/dashboard/mynfts">
          <a>
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-full text-sm py-2 px-7 text-center transition-all"
            >
              Sell now
            </button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default List
