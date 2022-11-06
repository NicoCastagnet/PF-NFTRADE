import SvgList from '@components/icons/svgList'

const List = () => {
  return (
    <div className="box1 bg-slate-600 h-60 max-sm:w-72 max-xl:w-72 max-lg:w-96 w-96  rounded-lg p-6 ease duration-500">
      <div className="icon flex justify-center items-center bg-blue-600 h-[3.3rem] w-[3.3rem] rounded-full">
        <SvgList fill="#fff" height="19" width="19" />
      </div>
      <div className="content">
        <p className="text-white font-semibold mt-3">List them for sell</p>
        <p className="text-slate-400 mt-3 mb-3">
          List all your NFT&apos;s at our marketplace and start getting money.
        </p>
        <button
          type="button"
          className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600 font-medium rounded-full text-sm py-2 px-7 text-center"
        >
          Sell now
        </button>
      </div>
    </div>
  )
}

export default List
