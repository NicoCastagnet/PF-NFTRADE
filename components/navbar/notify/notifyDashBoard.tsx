// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgCross from '@components/icons/svgCross'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import styles from '../../../styles/form.module.css'
import NotifyBuyCoins from './notifyBuyCoins'
import NotifyBuyNft from './notifyBuyNft'
import NotifyComment from './notifyComment'
import NotifyLiked from './notifyLiked'

interface NotifyDashBoardProps {
  isOpen: boolean
  handleClose: (isOpen: boolean) => void
  data: any
}

const NotifyDashBoard: React.FC<NotifyDashBoardProps> = ({
  isOpen,
  handleClose,
  data,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[9999]" onClose={handleClose}>
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
                        <Dialog.Title className="text-lg font-medium text-black dark:text-white">
                          Notifications
                        </Dialog.Title>
                      </div>
                      <button
                        type="button"
                        className="rounded-md text-black dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-all focus:outline-none"
                        onClick={() => handleClose(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <SvgCross className="w-5 h-5" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex h-full flex-col text-black bg-gray-200 dark:bg-[#202225] dark:text-white py-14 shadow-xl">
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      {/* NOTIFY LIST */}
                      {!data?.notify.length ? (
                        <div className="rounded-xl text-center text-black bg-white dark:bg-[#303339] dark:text-white p-5 text-lg font-semibold">
                          You don&apos;t have any new notifications!
                        </div>
                      ) : (
                        <div
                          className={`overflow-auto divide-y divide-gray-800 dark:divide-gray-700  ${styles.scrollbar}`}
                        >
                          {data?.notify.map((el, index) => (
                            <div key={el.id}>
                              {el.typeNotify === 'comment' && (
                                <NotifyComment
                                  key={index}
                                  id={el.id}
                                  nameNft={el.nameNft}
                                  nftId={el.nftId}
                                  userIdComment={el.userIdComment}
                                  nameUserComment={el.nameUserComment}
                                  comment={el.comment}
                                  createdAt={el.createdAt}
                                />
                              )}
                              {el.typeNotify === 'Liked' && (
                                <NotifyLiked
                                  key={index}
                                  id={el.id}
                                  userIdLiked={el.userIdLiked}
                                  nameUserLiked={el.nameUserLiked}
                                  nftId={el.nftId}
                                  nameNft={el.nameNft}
                                  createdAt={el.createdAt}
                                />
                              )}
                              {el.typeNotify === 'buyNft' && (
                                <NotifyBuyNft
                                  key={index}
                                  id={el.id}
                                  nftId={el.nftId}
                                  nameNft={el.nameNft}
                                  compradorId={el.compradorId}
                                  nameComprador={el.nameComprador}
                                  vendedorId={el.vendedorId}
                                  nameVendedor={el.nameVendedor}
                                  coins={el.coins}
                                  createdAt={el.createdAt}
                                />
                              )}
                              {el.typeNotify === 'buy' && (
                                <NotifyBuyCoins
                                  key={index}
                                  id={el.id}
                                  ordenId={el.ordenId}
                                  coins={el.coins}
                                  amount={el.amount}
                                  status={el.status}
                                  createdAt={el.createdAt}
                                />
                              )}
                            </div>
                          ))}
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

export default NotifyDashBoard
