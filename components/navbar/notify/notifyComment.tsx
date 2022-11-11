// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Link from 'next/link'
import ReactTimeAgo from 'react-time-ago'
import React from 'react'

const NotifyComment = ({ nameUserComment, namenft, nftId, comment, createdAt } ) => {
  const [view, setView] = useState(false)

  return (
    <Link
                    href="#"
                    className="flex py-3 px-4 hover:bg-gray-600 dark:hover:bg-[#393b41]"
                  >
                    <div className="pl-3 w-full">
                      <div className="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
                        {`has dejado un comentario en el NFT  `}
                        &nbsp;
                        <span className="font-semibold text-gray-900 dark:text-white">
                          &nbsp;{`${nameUserComment} `}
                          &nbsp;{`${namenft} `}
                          &nbsp;{`${nftId} `}
                          &nbsp;{`${comment} `}

                        </span>
                        &nbsp;{` pertenecioente a `}
                        <span className="font-semibold text-gray-900 dark:text-white"></span>
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-500">
                        
                          <ReactTimeAgo
                            date={createdAt}
                            format={'twitter'}
                          />
                        
                      </div>
                    </div>
                   
                  </Link>
  )
}

export default NotifyComment