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

interface Size {
  margin: string
  width: string
  height: string
  title: string
  titleH: string
  ownerAndPrice: string
  tagsH: string
  positionR: string
}

interface Props {
  setNftSize: React.Dispatch<React.SetStateAction<Size>>
  setOrder: React.Dispatch<React.SetStateAction<string>>
  setFilter: React.Dispatch<React.SetStateAction<(string | number)[]>>
}

const HeaderMarket: NextPage<Props> = ({ setNftSize, setOrder, setFilter }) => {
  const { openFilter, setOpenFilter } = useOpenFilterMenu()
  const [sideBar, setSideBar] = useState(false)
  const [orderMenu, setOrderMenu] = useState(false)
  const [cont, setCont] = useState(0)
  const openSideBar = () => {
    setSideBar(!sideBar)
  }

  const searchPriceAbove = () => {
    const value = document.getElementById('priceSearch').value
    if (value === '') {
      alert('digite un valor minimo para el filtrado')
    } else {
      setOrder('filter1')
      setFilter(['above', value, 100])
    }
  }

  const searchPriceBelow = () => {
    const value = document.getElementById('priceSearch').value
    if (value === '') {
      alert('digite un valor maximo para el filtrado')
    } else {
      setOrder('filter2')
      setFilter(['below', value, 100])
    }
  }
  const searchPriceBetween = () => {
    const value1 = document.getElementById('priceSearch1').value
    const value2 = document.getElementById('priceSearch2').value
    if (value1 === '') {
      alert('digite un valor minimo para la busqueda')
    } else if (value2 === '') {
      alert('digite un valor maximo para la busqueda')
    } else {
      setCont(cont + 1)
      setOrder(cont.toString())
      setFilter(['between', value1, value2])
    }
  }

  const openOrderMenu = () => {
    setOrderMenu(!orderMenu)
  }

  const bigger: Size = {
    margin: 'm-10',
    width: 'w-[350px]',
    height: 'h-[565px]',
    title: 'text-2xl',
    titleH: 'min-h-[64px]',
    ownerAndPrice: 'text-xl',
    tagsH: 'min-h-[48px]',
    positionR: 'right-[13%]',
  }

  const smaller: Size = {
    margin: 'm-4',
    width: 'w-[280px]',
    height: 'h-[475px]',
    title: 'text-[1.4rem]',
    titleH: 'max-h-[64px]',
    ownerAndPrice: 'text-[1.1rem]',
    tagsH: 'min-h-[48px]',
    positionR: 'right-[9%]',
  }

  return (
    <>
      <section className="market__header bg-slate-900 text-white py-1 px-20 w-full flex justify-between top-[5rem] fixed z-[5] items-center">
        <div className="left flex">
          <FilterLateral isOpen={openFilter} handleClose={setOpenFilter} />
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
              setFilter(['none', -1, -1])
              setOrder('all')
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
              onClick={() => setNftSize(smaller)}
            >
              <SvgGrid3 width="25" height="25" />
            </button>
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium rounded-r-md border focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
              onClick={() => setNftSize(bigger)}
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
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
                >
                  Oldest
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
                >
                  Newest
                </a>
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => {
                  setFilter(['none', -1, -1])
                  setOrder('min')
                }}
              >
                Min Price
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => {
                  setFilter(['none', -1, -1])
                  setOrder('max')
                }}
              >
                Max Price
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => {
                  setFilter(['none', -1, -1])
                  setOrder('AZ')
                }}
              >
                A-Z
              </li>
              <li
                className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => {
                  setFilter(['none', -1, -1])
                  setOrder('ZA')
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
