// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgPlus from '@components/icons/svgPlus'
import Link from 'next/link'

const CreateCard = () => {
  return (
    <>
      <div
        className={`h-auto w-[22rem] m-2 overflow-hidden relative flex flex-col rounded-xl p-[1px] group drop-shadow-lg`}
      >
        <div
          className={`h-auto w-[22rem] overflow-hidden relative flex flex-col bg-white dark:bg-[#303339] rounded-xl p-[1px] group`}
        >
          <div className="rounded-xl border-spacing-2 h-[20rem]">
            <SvgPlus className="h-full w-full fill-zinc-800 group-hover:scale-110 transition-all" />
          </div>
          <div className="flex flex-col p-4 h-full w-full justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row w-full justify-between">
                <h5
                  className={`text-xl text-gray-800 dark:text-white ease duration-300 py-5`}
                >
                  Create new NFT&apos;s and start making money on our platform!
                  Feel free to create whatever you want.
                </h5>
              </div>
              <Link href="/nfts/create">
                <a>
                  <button className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#393b41] dark:hover:bg-[#4c4e53] transition-all text-lg font-semibold w-full h-10 my-1">
                    Create it now!
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateCard
