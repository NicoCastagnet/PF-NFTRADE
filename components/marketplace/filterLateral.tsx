// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgCross from '@components/icons/svgCross'

const FilterLateral = ({
  sideBar,
  openSideBar,
  searchPriceBelow,
  searchPriceAbove,
  searchPriceBetween,
}) => {
  return (
    <section className={`${sideBar ? '' : 'hidden'}`}>
      <div
        onClick={openSideBar}
        className={` z-20 h-screen w-full fixed ${sideBar ? '' : 'hidden'}`}
      ></div>
      <div
        id="drawer-navigation"
        className="fixed z-40 h-screen p-6 overflow-y-auto w-80 bg-gray-800 drop-shadow-2xl ease duration-500"
      >
        <button
          type="button"
          className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center hover:bg-red-800 hover:text-white"
          onClick={openSideBar}
        >
          <SvgCross className="w-5 h-5" />
        </button>

        <h5 className="text-lg font-semibold uppercase text-gray-400 mt-6 mb-2">
          Filters menu
        </h5>

        {/* /////////////////////////////////// */}
        <div className="relative flex flex-row justify-center items-center w-full h-8">
          <input
            type="number"
            id="priceSearch"
            className="text-lg font-semibold w-full pl-2 pr-28 rounded-lg uppercase text-gray-400 mt-6 mb-2"
          />

          <button
            type="button"
            className="absolute h-7 text-gray-200 rounded-l-none top-[0.6rem] right-0 px-2 bg-sky-700 rounded-lg text-sm inline-flex items-center hover:bg-gray-600 hover:text-white"
            onClick={searchPriceAbove}
          >
            Price Above
          </button>
        </div>

        {/* ///////////////////////////////// */}
        <h6 className="text-lg font-semibold uppercase text-gray-400 mt-6 mb-2">
          Buscar precio entre
        </h6>
        <div className="relative flex flex-row justify-center items-center w-full h-8">
          <input
            type="number"
            id="priceSearch1"
            className="text-lg font-semibold w-full pl-2 pr-20 rounded-lg uppercase text-gray-400 mt-6 mb-2"
          />
          <button
            type="button"
            className="absolute h-7 text-gray-200 rounded-l-none top-[0.6rem] right-0 px-2 bg-sky-700 rounded-lg text-sm inline-flex items-center hover:bg-gray-600 hover:text-white"
            onClick={searchPriceBelow}
          >
            min price
          </button>
        </div>
        {/* ////////////////////////////////////////////////// */}
        <div className="relative flex flex-row justify-center items-center w-full mt-2 h-8">
          <input
            type="number"
            id="priceSearch2"
            className="text-lg font-semibold w-full pl-2 pr-20 rounded-lg uppercase text-gray-400 mt-6 mb-2"
          />
          <button
            type="button"
            className="absolute h-7 text-gray-200 rounded-l-none top-[0.6rem] right-0 px-2 bg-sky-700 rounded-lg text-sm inline-flex items-center hover:bg-gray-600 hover:text-white"
            onClick={searchPriceBetween}
          >
            max price
          </button>
        </div>
      </div>
    </section>
  )
}

export default FilterLateral
