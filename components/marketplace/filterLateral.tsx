import SvgCross from '@components/icons/svgCross'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface FilterSideBarProps {
  isOpen: boolean
  handleClose: (isOpen: boolean) => void
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({
  isOpen,
  handleClose,
}) => {
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
          <div className="fixed inset-0 bg-slate-700 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 -left-10 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
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
                    <div className="absolute top-0 right-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4 z-50 py-5">
                      <div className="px-3 sm:px-3">
                        <Dialog.Title className="text-lg font-medium text-white">
                          Filters menu
                        </Dialog.Title>
                      </div>
                      <button
                        type="button"
                        className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                        onClick={() => handleClose(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <SvgCross className="w-5 h-5" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col bg-gray-800 py-14 shadow-xl">
                    <h1>test?</h1>
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

export default FilterSideBar
