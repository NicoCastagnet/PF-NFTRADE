import SvgChevron from '@components/icons/svgChevronDown'
import SvgCross from '@components/icons/svgCross'
import SvgGrid2 from '@components/icons/svgGrid2'
import SvgGrid3 from '@components/icons/svgGrid3'
import SvgList2 from '@components/icons/svgList2'
import SvgReload from '@components/icons/svgReload'
import styles from '../../styles/form.module.css'

import { useState } from 'react'

const HeaderMarket = () => {
  const [sideBar, setSideBar] = useState(false)
  const [orderMenu, setOrderMenu] = useState(false)

  const openSideBar = () => {
    setSideBar(!sideBar)
  }

  const openOrderMenu = () => {
    setOrderMenu(!orderMenu)
  }

  return (
    <>
      <section className="market__header bg-slate-900 text-white py-1 px-20 w-full flex justify-between top-[5.5rem] fixed z-[5] items-center">
        <div className="left flex">
          <button
            type="button"
            className="py-3 px-3 text-sm font-medium rounded-full border focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
            onClick={openSideBar}
          >
            <SvgList2 width="25" height="25" />
          </button>
          <button
            type="button"
            className="flex items-center py-3 px-3 ml-4 text-sm font-medium rounded-full border focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
          >
            <SvgReload
              width="25"
              height="25"
              className="mr-2 hover:animate-spin"
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
            >
              <SvgGrid2 width="25" height="25" />
            </button>
            <button
              type="button"
              className="py-2 px-4 text-sm font-medium rounded-r-md border focus:z-10 focus:ring-2 bg-gray-700 border-gray-600 text-white hover:text-white hover:bg-gray-600 focus:ring-blue-500 focus:text-white"
            >
              <SvgGrid3 width="25" height="25" />
            </button>
          </div>

          <div
            className={`absolute before:absolute top-[5.5rem] right-64 z-10 w-44 px-4 rounded shadow bg-gray-700 ${
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
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
                >
                  Ascending
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 hover:bg-gray-600 hover:text-white"
                >
                  Descending
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className={`${sideBar ? '' : 'hidden'}`}>
        <div
          onClick={openSideBar}
          className={` z-20 h-screen w-full fixed ${sideBar ? '' : 'hidden'}`}
        ></div>
        <div
          id="drawer-navigation"
          className="fixed z-40 h-screen p-4 overflow-y-auto w-80 bg-gray-800 drop-shadow-2xl"
        >
          <h5 className="text-base font-semibold uppercase text-gray-400">
            Filters menu
          </h5>
          <button
            type="button"
            className="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center hover:bg-gray-600 hover:text-white"
            onClick={openSideBar}
          >
            <SvgCross className="w-5 h-5" />
          </button>
        </div>
      </section>
    </>
  )
}

export default HeaderMarket
