// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgCoin from '@components/icons/svgCoin'
import SvgCross from '@components/icons/svgCross'
import { Dialog, Transition } from '@headlessui/react'
import useBuyNftPriceCoins from 'hook/useBuyNftPriceCoins'
import Image from 'next/image'
import { Fragment } from 'react'

interface CartSideBarProps {
  isOpen: boolean
  handleClose: (isOpen: boolean) => void
}

const CartSideBar: React.FC<CartSideBarProps> = ({ isOpen, handleClose }) => {
  const { totalPrice, cart, removeItem, clearCart, handleChange } =
    useBuyNftPriceCoins(handleClose)

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-100 dark:bg-[#393b41] dark:bg-opacity-60 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 left-14 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4 bg-gray-200 dark:bg-[#202225] z-50 w-full py-5">
                      <button
                        type="button"
                        className="rounded-md text-black dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-all focus:outline-none"
                        onClick={() => handleClose(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <SvgCross className="w-5 h-5" />
                      </button>
                      <div className="px-3 sm:px-3">
                        <Dialog.Title className="text-lg font-medium text-black dark:text-white">
                          Shopping cart
                        </Dialog.Title>
                      </div>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll text-black bg-gray-200 dark:bg-[#202225] dark:text-white py-14 shadow-xl">
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* CART LIST */}
                      {!cart.length ? (
                        <div className="text-center text-black bg-white dark:bg-[#303339] dark:text-white p-5 text-lg font-semibold">
                          There&apos;s nothing to see here!
                        </div>
                      ) : (
                        <div>
                          <ul>
                            {cart.map((item) => (
                              <li
                                key={item.id}
                                className="flex items-center gap-4 h-auto my-3 border border-white dark:border-[#303339] rounded-md pr-2"
                              >
                                <Image
                                  src={item.image}
                                  alt="item-image"
                                  width={100}
                                  height={100}
                                  className="object-cover rounded-tl-md rounded-bl-md"
                                />
                                <div className="flex w-full justify-between">
                                  <div className="flex flex-col items-left text-black dark:text-white">
                                    <span>{item.name}</span>
                                    <span className="flex items-center gap-2">
                                      <SvgCoin />
                                      {item.price}
                                    </span>
                                  </div>
                                  <button
                                    className="text-red-600 hover:text-red-500 transition-all flex"
                                    onClick={() => removeItem(item.id)}
                                  >
                                    <SvgCross className="w-5 h-5" />
                                  </button>
                                </div>
                              </li>
                            ))}
                            <button
                              className="bg-red-600 hover:bg-red-500 transition-all text-white text-lg font-semibold w-full h-10 my-5"
                              onClick={clearCart}
                            >
                              Clear Cart
                            </button>
                            <hr className="my-4 mx-auto w-48 h-1 bg-white dark:bg-gray-600 rounded border-0 md:mb-8" />
                          </ul>
                          <div className="flex justify-between">
                            <span className="text-black dark:text-white font-bold text-xl flex items-center gap-2 justify-between">
                              Subtotal:
                            </span>
                            <span className="flex items-center gap-2 text-black dark:text-white font-bold text-xl">
                              <SvgCoin className="w-6 h-6" />{' '}
                              {totalPrice.toLocaleString('es-ES')}
                            </span>
                          </div>
                          <button
                            className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#303339] dark:hover:bg-[#393b41] transition-all text-lg font-semibold w-full h-10 my-5"
                            onClick={handleChange}
                          >
                            Go to checkout
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CartSideBar
