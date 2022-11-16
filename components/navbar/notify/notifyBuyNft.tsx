// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Link from 'next/link'
import { useState } from 'react'
import ReactTimeAgo from 'react-time-ago'
import ClearView from './clear'

const NotifyBuyNft = ({
  id,
  nftId,
  nameNft,
  compradorId,
  nameComprador,
  vendedorId,
  nameVendedor,
  coins,
  createdAt,
}) => {
  const [view, setView] = useState(false)

  return (
    <Link
      href={`#`} // link de nft vendido o comprado
      className={`${
        view ? '' : 'flex py-2 px-2 hover:bg-gray-600 dark:hover:bg-[#393b41]'
      } `}
    >
      <a>
        <div
          key={id}
          className={`${
            view ? 'hidden' : ''
          } flex flex-row justify-between items-start mt-2`}
        >
          <div className="px-1 w-full flex flex-col justify-center items-center mb-2">
            <div className="text-gray-500 text-sm dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">
                {`${nameComprador}`}
              </span>
              &nbsp;{`bought you the NFT`}
              <span className="font-semibold text-gray-900 dark:text-white">
                &nbsp;{`${nameNft}`}
              </span>
              &nbsp;{`for a total of `}
              <span className="font-semibold text-gray-900 dark:text-white">{`${coins} coins.`}</span>
            </div>
            <div className="flex justify-center ite w-full text-xs text-blue-600 dark:text-blue-500">
              <ReactTimeAgo
                date={Date.parse(createdAt)}
                locale={'en-US'}
                format={'twitter'}
              />
            </div>
          </div>
          <div className=" px-[2px] flex justify-start items-start h-full">
            <ClearView id={id} setView={setView} />
          </div>
        </div>
      </a>
    </Link>
  )
}

export default NotifyBuyNft
