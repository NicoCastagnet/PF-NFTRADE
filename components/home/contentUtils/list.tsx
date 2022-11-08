import SvgList from '@components/icons/svgList'

const List = () => {
  return (
    <div className="box1 bg-transparent border-2 border-slate-800 dark:bg-[#303339] dark:border-2 dark:border-zinc-600 hover:-translate-y-2 hover:shadow-lg h-60 max-sm:w-72 max-xl:w-72 max-lg:w-96 w-96 rounded-lg p-6 ease duration-500">
      <div className="icon flex justify-center items-center bg-blue-600 h-[3.3rem] w-[3.3rem] rounded-full">
        <SvgList fill="#fff" height="19" width="19" />
      </div>
      <div className="content">
        <p className="text-white font-semibold mt-3">List them for sell</p>
        <p className="text-gray-400 mt-3 mb-3">
          Post all your NFT&apos;s start getting money.
        </p>
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-full text-sm py-2 px-7 text-center transition-all"
        >
          Sell now
        </button>
      </div>
    </div>
  )
}

export default List
