// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgBell from '@components/icons/svgBell'
import fetcher from '@lib/fetcher'
import { useSession } from 'next-auth/react'
// import ReactTimeAgo from 'react-time-ago'
import useSWR from 'swr'
import styles from '../../../styles/form.module.css'
import NotifyBuyNft from './notifyBuyNft'
import NotifyComment from './notifyComment'
import NotifyLiked from './notifyLiked'

const Notificaciones = () => {
  const { data: session } = useSession()
  const { data } = useSWR(
    `/api/notificaciones?user=${session?.user.id}`,
    fetcher,
  )

  return (
    <section
      className={`flex justify-center items-center relative ${styles.notify}`}
    >
      <button className="relative group">
        {data?.notify.length ? (
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
                <>
                  {el.typeNotify === 'comment' && (
                    <NotifyComment
                      key={el.id}
                      id={el.id}
                      namenft={el.nameNft}
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
                      nftid={el.nftId}
                      nameNft={el.nameNft}
                      compradorId={el.compradorId}
                      nameComprador={el.nameComprador}
                      vendedorId={el.vendedorId}
                      nameVendedor={el.nameVendedor}
                      coins={el.coins}
                      createdAt={el.createdAt}
                    />
                  )}
                  {/* {el.typeNotify ? ( */}
                  {/* ////// SI TENGO STATUS ""MERCADO PAGOS"" /////////// */}
                  {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck */}
                  {/* ) : ( */}
                  {/* //////// SI NO TENGO STATUS ""MECADO PAGOS"" ////////// */}
                  {/* <> */}
                  {/* {session?.user.id == el?.compradorId && ( */}
                  {/* ///////// SI EL ID DEL USER COINSIDE CON ID COMPRADOR //////// */}
                  {/* <a
                    key={index}
                    href="#"
                    className="flex py-3 px-4 hover:bg-gray-600 dark:hover:bg-[#393b41]"
                  >
                    <div className="pl-3 w-full">
                      <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                        {`has comprado un nft a ${el?.nameVendedor}`}
                        &nbsp;
                        <span className="font-semibold text-gray-900 dark:text-white">
                          &nbsp;{`por el total de ${el?.coins} Coins`}
                        </span>
                        &nbsp;{` your payment has been made successfully`}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-500">
                        {el?.createdAt && (
                          <ReactTimeAgo
                            date={el?.createdAt}
                            format={'twitter'}
                          />
                        )}
                      </div>
                    </div>
                  </a> */}
                  {/* )} */}
                  {/* {session?.user.id == el.vendedorId && ( */}
                  {/* ///////// SI EL ID DEL USER COINSIDE CON ID VENDEDOR //////// */}
                  {/* <a
                    key={index}
                    href="#"
                    className="flex py-3 px-4 hover:bg-gray-600 dark:hover:bg-[#393b41]"
                  >
                    <div className="pl-3 w-full">
                      <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                        {`has realizado una venta de nft al comprador  ${el?.nameComprador}`}
                        &nbsp;
                        <span className="font-semibold text-gray-900 dark:text-white">
                          &nbsp;{`por el total de  ${el?.coins} Coins`}
                          {session?.user.name || session?.user.username}
                        </span>
                        &nbsp;{` your payment has been made successfully`}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-500">
                        {el?.createdAt && (
                          <ReactTimeAgo
                            date={el?.createdAt}
                            format={'twitter'}
                          />
                        )}
                      </div>
                    </div>
                  </a> */}
                  {/* )} */}
                  {/* {el?.content && ( */}
                  {/* <a
                    key={index}
                    href="#"
                    className="flex py-3 px-4 hover:bg-gray-600 dark:hover:bg-[#393b41]"
                  >
                    <div className="pl-3 w-full">
                      <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                        {`has dejado un comentario en el NFT  `}
                        &nbsp;
                        <span className="font-semibold text-gray-900 dark:text-white">
                          &nbsp;{`${el?.nft.name} `}
                        </span>
                        &nbsp;{` pertenecioente a `}
                        <span className="font-semibold text-gray-900 dark:text-white">{`${el.nft.owner.name}`}</span>
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-500">
                        {el?.createdAt && (
                          <ReactTimeAgo
                            date={el?.createdAt}
                            format={'twitter'}
                          />
                        )}
                      </div>
                    </div>
                  </a> */}
                  {/* )} */}
                  {/* </> */}
                  {/* )} */}
                </>
              ))
            ) : (
              <div className="flex justify-center items-center w-full py-4 px-8">
                <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                  &nbsp;{session?.user.name || session?.user.username}&nbsp;
                  <span className="font-semibold text-gray-900 dark:text-white">
                    &nbsp;{`you don't have any new notifications`}
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
