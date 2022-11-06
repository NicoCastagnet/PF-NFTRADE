import SvgCross from '@components/icons/svgCross'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import type { FilterProps } from './headerMarket'

interface FilterSideBarProps {
  isOpen: boolean
  handleClose: (isOpen: boolean) => void
  filterValues: FilterProps
  setFilter: ({ minPrice, maxPrice }: FilterProps) => void
}

const FilterSideBar: React.FC<FilterSideBarProps> = ({
  isOpen,
  handleClose,
  filterValues,
  setFilter,
}) => {
  const handleFilter = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      minPrice: { value: string }
      maxPrice: { value: string }
    }
    const minPrice = target.minPrice.value
    const maxPrice = target.maxPrice.value

    setFilter({ minPrice, maxPrice })
    handleClose(false)
  }

  const handleClear = () => {
    setFilter({ minPrice: '', maxPrice: '' })
    handleClose(false)
  }
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
                  <div className="flex h-full flex-col bg-gray-800 py-14 shadow-xl text-slate-200">
                    <div className="p-8">
                      <form
                        onSubmit={handleFilter}
                        className="flex flex-col gap-6"
                        autoComplete="off"
                      >
                        <h1 className="font-bold text-xl">Filter by price</h1>
                        <div className="flex gap-4 items-center justify-center">
                          <div className="flex flex-col w-full">
                            <label htmlFor="minPrice">Min price</label>
                            <input
                              className="w-full p-2 rounded-sm bg-slate-600 text-white"
                              type="number"
                              id="minPrice"
                              min="0"
                              max="9999"
                              placeholder="Min price"
                              name="minPrice"
                              defaultValue={filterValues.minPrice}
                            />
                          </div>
                          <div className="flex flex-col w-full">
                            <label htmlFor="maxPrice">Max price</label>
                            <input
                              className="w-full p-2 rounded-sm bg-slate-600 text-white"
                              type="text"
                              id="maxPrice"
                              min="0"
                              max="9999"
                              placeholder="Max price"
                              name="maxPrice"
                              defaultValue={filterValues.maxPrice}
                            />
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-3 bg-slate-900 cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                      <button
                        onClick={handleClear}
                        className="w-full py-3 bg-red-500 text-white mt-4 cursor-pointer"
                      >
                        Clear
                      </button>
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

export default FilterSideBar
