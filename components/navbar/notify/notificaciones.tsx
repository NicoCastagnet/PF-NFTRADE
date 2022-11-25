// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgBell from '@components/icons/svgBell'
import fetcher from '@lib/fetcher'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'
import styles from '../../../styles/form.module.css'
import NotifyBuyCoins from './notifyBuyCoins'
import NotifyBuyNft from './notifyBuyNft'
import NotifyComment from './notifyComment'
import NotifyLiked from './notifyLiked'

const Notificaciones = () => {
  const { data: session } = useSession()
  const URL = `/api/notificaciones?user=${session?.user.id}`
  const { data } = useSWR(URL, fetcher)

  return (
    <section
      className={`flex justify-center items-center relative ${styles.notify}`}
    >
      <button className="relative group">
        {data?.total ? (
          <>
            <span className="h-5 w-6 bg-red-500 rounded-full absolute top-[0.35rem] left-5 border-[3px] border-gray-900 z-10 text-sm text-center flex justify-center items-center pt-1 ">
              {data.total}
            </span>
            <span className="animate-ping h-5 w-6 bg-red-500 rounded-full inline-flex absolute top-[0.35rem] left-5 z-10"></span>
          </>
        ) : (
          ''
        )}
        <SvgBell
          className={`m-3 ${styles.bell} group-hover:text-yellow-500 transition-all`}
          width={'25'}
          height={'25'}
        />
      </button>
      <section className="absolute top-16 -right-[6rem] w-full before:absolute before:-top-4 before:right-24 before:border-b-[1rem] before:border-b-gray-700 dark:before:border-b-[#303339]">
        <div
          className={`bg-gray-700 dark:bg-[#303339] divide-gray-800 dark:divide-gray-700 z-20 w-full shadow rounded-xl before:border-b-8 before:border-b-gray-700 dark:before:border-b-[#303339]`}
          data-popper-placement="bottom"
        >
          <div className="block py-2 px-4 font-medium text-center bg-gray-700 dark:bg-[#303339] text-white rounded-t-xl">
            Notifications
          </div>

          <div
            className={`divide-y divide-gray-800 dark:divide-gray-700 max-h-[30rem] overflow-auto ${styles.scrollbar}`}
          >
            {data?.notify.length ? (
              data?.notify.map((el) => (
                <div key={el.id}>
                  {el.typeNotify === 'comment' && (
                    <NotifyComment
                      key={el.id}
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
                      key={el.id}
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
                      key={el.id}
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
                      key={el.id}
                      id={el.id}
                      ordenId={el.ordenId}
                      coins={el.coins}
                      amount={el.amount}
                      status={el.status}
                      createdAt={el.createdAt}
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full py-4 px-8">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                  {session?.user.name || session?.user.username}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {' '}
                    you don&apos;t have any new notifications
                  </span>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-500"></div>
              </div>
            )}
          </div>

          <a
            href="#"
            className="block py-2 text-sm font-medium text-center border-t-2 text-gray-900 bg-gray-700 hover:bg-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-white rounded-b-xl"
          >
            <div className="inline-flex items-center ">View all</div>
          </a>
        </div>
      </section>
    </section>
  )
}

export default Notificaciones
