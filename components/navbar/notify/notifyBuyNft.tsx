// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Link from 'next/link'
import ReactTimeAgo from 'react-time-ago'
import ClearView from './clear'

const NotifyBuyNft = () => {
  const [view, setView] = useState(false)

  return (
    <Link
      href={`#`}
      className="flex py-2 px-2 hover:bg-gray-600 dark:hover:bg-[#393b41]"
    >
      <div className="px-1 w-full flex flex-col justify-center items-center relative">
        <div className="text-gray-500 text-sm mb-1.5 pr-6 dark:text-gray-400">
          el usuario
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
        <ClearView id={id}/>
      </div>
    </Link>
  )
}

export default NotifyBuyNft