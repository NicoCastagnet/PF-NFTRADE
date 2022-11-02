import SvgClose from '@components/icons/svgClose'
import { useCart } from '@context/cart'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface CartSideBarProps {
  isOpen: boolean
  handleClose: (isOpen: boolean) => void
}

const CartSideBar: React.FC<CartSideBarProps> = ({ isOpen, handleClose }) => {
  const { cart, removeItem, clearCart } = useCart()

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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                    <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => handleClose(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <SvgClose />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Panel title
                      </Dialog.Title>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* CART LIST */}
                      {!cart.length ? (
                        <div>No items</div>
                      ) : (
                        <ul>
                          {cart.map((item) => (
                            <li
                              key={item.id}
                              className="flex items-center gap-4"
                            >
                              <span>{item.name}</span>{' '}
                              <button
                                className="text-red-500"
                                onClick={() => removeItem(item.id)}
                              >
                                X
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                      <button onClick={clearCart}>Clear Cart</button>
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
