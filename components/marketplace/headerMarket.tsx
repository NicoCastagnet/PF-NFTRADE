// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgChevron from '@components/icons/svgChevronDown'
import SvgGrid2 from '@components/icons/svgGrid2'
import SvgGrid3 from '@components/icons/svgGrid3'
import SvgList2 from '@components/icons/svgList2'
import SvgReload from '@components/icons/svgReload'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useOpenFilterMenu } from '../../hook/openFilterMenu'
import styles from '../../styles/form.module.css'
import FilterLateral from './filterLateral'

export interface FilterProps {
  minPrice: string
  maxPrice: string
}

interface Props {
  setOrder: (order: string) => void
  setFilter: ({ minPrice, maxPrice }: FilterProps) => void
  filterValues: FilterProps
  setCardSize: React.Dispatch<React.SetStateAction<string>>
}

const HeaderMarket: NextPage<Props> = ({
  setOrder,
  setFilter,
  filterValues,
  setCardSize,
}) => {
  const { openFilter, setOpenFilter } = useOpenFilterMenu()
  const [orderMenu, setOrderMenu] = useState(false)

  const openOrderMenu = () => {
    setOrderMenu(!orderMenu)
  }

  return (
    <>
      <section className="market__header max-sm:p-0 bg-slate-900 dark:bg-[#202225] dark:border-b-gray-600 dark:border-b text-white py-1 px-20 w-full flex justify-between top-[5rem] z-[5] fixed items-center">
        <div className="left flex">
          <FilterLateral
            isOpen={openFilter}
            handleClose={setOpenFilter}
            filterValues={filterValues}
            setFilter={setFilter}
          />
          <button
            type="button"
            className="max-sm:bg-transparent dark:max-sm:bg-transparent bg-gray-700 text-white hover:bg-gray-500 dark:bg-[#303339] dark:hover:drop-shadow-lg transition-all py-3 px-3 text-sm font-medium rounded-lg"
            onClick={() => setOpenFilter(!openFilter)}
          >
            <SvgList2 width="25" height="25" />
          </button>
          <button
            type="button"
            className="max-sm:bg-transparent dark:max-sm:bg-transparent max-sm:m-0 max-md:w-40 bg-gray-700 text-white hover:bg-gray-500 dark:bg-[#303339] dark:hover:drop-shadow-lg transition-all group flex items-center py-3 px-3 ml-4 text-sm font-medium rounded-lg"
            onClick={() => {
              setOrder('')
              setFilter({ minPrice: '0', maxPrice: '99999' })
            }}
          >
            <SvgReload
              width="25"
              height="25"
              className="group-hover:animate-spin r-btn mr-2 hover:animate-spin max-sm:m-0"
            />
            <span className="max-sm:hidden">Reload content</span>
          </button>
        </div>
        <div className="right flex">
          <button
            id="dropdownButton"
            className="max-sm:bg-transparent dark:max-sm:bg-transparent max-sm:text-base max-sm:p-0 max-sm:w-[89px] max-md:w-60 bg-gray-700 text-white hover:bg-gray-500 dark:bg-[#303339] dark:hover:drop-shadow-lg transition-all font-medium rounded-lg text-xl px-14 py-3 m-3 text-left flex items-center"
            type="button"
            onClick={openOrderMenu}
          >
            Order by <SvgChevron className="ml-4 w-4 h-4 max-sm:ml-2" />
          </button>

          <div
            className="inline-flex rounded-md shadow-sm m-3 max-sm:mx-0 max-sm:hidden"
            role="group"
          >
            <button
              type="button"
              className="bg-gray-700 text-white hover:bg-gray-500 border-gray-500 dark:bg-[#303339] dark:border-[#43464c] dark:hover:drop-shadow-lg transition-all border py-2 px-4 text-sm font-medium rounded-l-lg"
              onClick={() => setCardSize('small')}
            >
              <SvgGrid3 width="25" height="25" />
            </button>
            <button
              type="button"
              className="bg-gray-700 text-white hover:bg-gray-500 border-gray-500 dark:bg-[#303339] dark:border-[#43464c] dark:hover:drop-shadow-lg transition-all border py-2 px-4 text-sm font-medium rounded-r-md"
              onClick={() => setCardSize('bigger')}
            >
              <SvgGrid2 width="25" height="25" />
            </button>
          </div>

          <div
            className={`max-sm:right-2 max-sm:top-[4.5rem] absolute before:absolute top-[5.5rem] right-64 z-10 w-44 rounded shadow-xl bg-gray-700 dark:bg-[#303339] max-sm:w-28 ${
              orderMenu ? '' : 'hidden'
            } ${styles.orderByMenuSmall}`}
          >
            <div
              onClick={openOrderMenu}
              className={` w-full h-screen -z-10 fixed top-0 left-0 ${
                orderMenu ? '' : 'hidden'
              }`}
            ></div>
            <ul className="py-2 text-lg text-gray-200 max-sm:text-base max-sm:w-28">
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer max-sm:py-1"
                onClick={() => setOrder('createdAt_asc')}
              >
                Oldest
              </li>
              <li
                onClick={() => setOrder('createdAt_desc')}
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer max-sm:py-1"
              >
                Newest
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer max-sm:py-1"
                onClick={() => {
                  setOrder('price_asc')
                }}
              >
                Min Price
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer max-sm:py-1"
                onClick={() => {
                  setOrder('price_desc')
                }}
              >
                Max Price
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer max-sm:py-1"
                onClick={() => {
                  setOrder('name_asc')
                }}
              >
                A-Z
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer max-sm:py-1"
                onClick={() => {
                  setOrder('name_desc')
                }}
              >
                Z-A
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeaderMarket
