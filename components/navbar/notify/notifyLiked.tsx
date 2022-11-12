// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Link from 'next/link'
import { useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import ClearView from './clear'

const NotifyLiked = ({
  id,
  userIdLiked,
  nameUserLiked,
  nftId,
  nameNft,
  createdAt,
}) => {
  const [view, setView] = useState(false)
  return (
    <Link
      href={`#`} // link user que dio liked o el NFT que le dieron liked
      className={`${
        view ? '' : 'flex py-2 px-2 hover:bg-gray-600 dark:hover:bg-[#393b41]'
      } `}
    >
      <a>
        <div
          className={`${
            view ? 'hidden' : ''
          } flex flex-row justify-between items-start`}
        >
          <div className="px-1 w-full flex flex-col justify-center items-center">
            <div className="text-gray-500 text-sm dark:text-gray-400">
              El usuario
              <span className="font-semibold text-gray-900 dark:text-white">
                {` ${nameUserLiked}`}
              </span>
              &nbsp;{`te a dado liked en el nft `}
              <span className="font-semibold text-gray-900 dark:text-white">
                &nbsp;{`${nameNft}`}
              </span>
              &nbsp;{` en tu pocesion`}
            </div>
            <div className="flex justify-center ite w-full text-xs text-blue-600 dark:text-blue-500">
              <ReactTimeAgo date={createdAt} format={'twitter'} />
            </div>
          </div>
          <div className=" px-[2px] flex justify-start items-start h-full">
            <ClearView id={id} setView={setView} heig />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default NotifyLiked
