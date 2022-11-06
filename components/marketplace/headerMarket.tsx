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
  // const [cont, setCont] = useState(0)

  // const searchPriceAbove = () => {
  //   const value = document.getElementById('priceSearch').value
  //   if (value === '') {
  //     alert('digite un valor minimo para el filtrado')
  //   } else {
  //     setOrder('filter1')
  //     setFilter(['above', value, 100])
  //   }
  // }

  // const searchPriceBelow = () => {
  //   const value = document.getElementById('priceSearch').value
  //   if (value === '') {
  //     alert('digite un valor maximo para el filtrado')
  //   } else {
  //     setOrder('filter2')
  //     setFilter(['below', value, 100])
  //   }
  // }
  // const searchPriceBetween = () => {
  //   const value1 = document.getElementById('priceSearch1').value
  //   const value2 = document.getElementById('priceSearch2').value
  //   if (value1 === '') {
  //     alert('digite un valor minimo para la busqueda')
  //   } else if (value2 === '') {
  //     alert('digite un valor maximo para la busqueda')
  //   } else {
  //     setCont(cont + 1)
  //     setOrder(cont.toString())
  //     setFilter(['between', value1, value2])
  //   }
  // }

  const openOrderMenu = () => {
    setOrderMenu(!orderMenu)
  }

  return (
    <>
      <section className="market__header bg-slate-900 text-white py-1 px-20 w-full flex justify-between top-[5rem] fixed z-[5] items-center">
        <div className="left flex">
          <FilterLateral
            isOpen={openFilter}
            handleClose={setOpenFilter}
            filterValues={filterValues}
            setFilter={setFilter}
          />
          <button
            type="button"
            className="py-3 px-3 text-sm font-medium rounded-full border focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
            onClick={() => setOpenFilter(!openFilter)}
          >
            <SvgList2 width="25" height="25" />
          </button>
          <button
            type="button"
            className="group flex items-center py-3 px-3 ml-4 text-sm font-medium rounded-full border focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
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
            className="text-white focus:outline-none font-medium rounded-lg text-xl px-14 py-3 m-3 text-left flex items-center focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
            type="button"
            onClick={openOrderMenu}
          >
            Order by <SvgChevron className="ml-4 w-4 h-4" />
          </button>

          <div className="inline-flex rounded-md shadow-sm m-3" role="group">
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium rounded-l-lg border focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
              onClick={() => setCardSize('small')}
            >
              <SvgGrid3 width="25" height="25" />
            </button>
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium rounded-r-md border focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
              onClick={() => setCardSize('bigger')}
            >
              <SvgGrid2 width="25" height="25" />
            </button>
          </div>

          <div
            className={`absolute before:absolute top-[5.5rem] right-64 z-10 w-44  rounded shadow bg-gray-700 ${
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
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => setOrder('createdAt_asc')}
              >
                Oldest
              </li>
              <li
                onClick={() => setOrder('createdAt_desc')}
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
              >
                Newest
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => {
                  setOrder('price_asc')
                }}
              >
                Min Price
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => {
                  setOrder('price_desc')
                }}
              >
                Max Price
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => {
                  setOrder('name_asc')
                }}
              >
                A-Z
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
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
