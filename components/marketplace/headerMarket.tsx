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
      <section className="market__header bg-slate-900 dark:bg-[#202225] dark:border-b-gray-600 dark:border-b text-white py-1 px-2 lg:px-20 w-full flex flex-wrap justify-between top-[5rem] z-[5] fixed items-center">
        <div className="left flex">
          <FilterLateral
            isOpen={openFilter}
            handleClose={setOpenFilter}
            filterValues={filterValues}
            setFilter={setFilter}
          />
          <button
            type="button"
            className="bg-gray-700 text-white hover:bg-gray-500 dark:bg-[#303339] dark:hover:drop-shadow-lg transition-all ml-3 py-3 px-3 text-sm font-medium rounded-full"
            onClick={() => setOpenFilter(!openFilter)}
          >
            <SvgList2 width="25" height="25" />
          </button>
          <button
            type="button"
            className="bg-gray-700 text-white hover:bg-gray-500 dark:bg-[#303339] dark:hover:drop-shadow-lg transition-all group flex items-center py-3 px-3 ml-4 text-sm font-medium rounded-full"
            onClick={() => {
              setOrder('')
              setFilter({ minPrice: '', maxPrice: '' })
            }}
          >
            <SvgReload
              width="25"
              height="25"
              className="group-hover:animate-spin r-btn mr-2 hover:animate-spin"
            />
            Reload content
          </button>
        </div>
        <div className="right flex">
          <button
            id="dropdownButton"
            className="bg-gray-700 text-white hover:bg-gray-500 dark:bg-[#303339] dark:hover:drop-shadow-lg transition-all font-medium rounded-lg lg:text-xl px-5 lg:px-14 py-3 m-3 text-left flex items-center"
            type="button"
            onClick={openOrderMenu}
          >
            Order by <SvgChevron className="ml-4 w-4 h-4" />
          </button>

          <div className="inline-flex rounded-md shadow-sm m-3" role="group">
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
            className={`absolute before:absolute top-[5.5rem] right-64 z-10 w-44 rounded shadow-xl bg-gray-700 dark:bg-[#303339] ${
              orderMenu ? '' : 'hidden'
            } ${styles.orderByMenu}`}
          >
            <div
              onClick={openOrderMenu}
              className={` w-full h-screen -z-10 fixed top-0 left-0  ${
                orderMenu ? '' : 'hidden'
              }`}
            ></div>
            <ul className="py-2 text-lg text-gray-200">
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer"
                onClick={() => setOrder('createdAt_asc')}
              >
                Oldest
              </li>
              <li
                onClick={() => setOrder('createdAt_desc')}
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer"
              >
                Newest
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer"
                onClick={() => {
                  setOrder('price_asc')
                }}
              >
                Min Price
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer"
                onClick={() => {
                  setOrder('price_desc')
                }}
              >
                Max Price
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer"
                onClick={() => {
                  setOrder('name_asc')
                }}
              >
                A-Z
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white dark:hover:bg-[#393b41] cursor-pointer"
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
