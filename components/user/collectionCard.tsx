// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgCoin from '@components/icons/svgCoin'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  collection: Collection
}

interface Collection {
  id: string
  name: string
  image: string | null
  price: number
  discount: number
  description: string
}

const CollectionCard = ({ collection }: Props) => {
  return (
    <div
      key={collection.id}
      className={`w-[30%] mr-6 mb-6 max-w-[277px] min-w-[194px] h-[300px] overflow-hidden relative flex flex-col bg-slate-900 dark:bg-stone-900 border-[16px] rounded-xl p-[1px] border-slate-900 dark:border-stone-900 cursor-pointer group shadow-lg shadow-zinc-500`}
    >
      <Link href={`/collections/${collection.id}`} key={collection.id}>
        {/* // h-[35rem] w-[22rem] */}
        <div className="relative">
          <div className="rounded-xl border-spacing-2 ">
            <Image
              src={collection.image}
              height={'1000'}
              width={'1000'}
              quality={20}
              alt={`image-${collection.name}`}
              className="rounded-t-xl object-cover group-hover:scale-110 transition duration-300 ease-in-out overflow-auto"
            />
          </div>
          <div className="flex flex-col w-full justify-between ">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row w-full justify-between">
                <h5
                  className={`text-xl text-white font-bold truncate ease duration-300`}
                >
                  {collection.name}
                </h5>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-6">
              <div className="flex flex-row justify-center items-center gap-2">
                <span>
                  <SvgCoin height={20} width={20} className={'fill-white'} />
                </span>
                <span className="text-white font-semibold text-xl">
                  {collection.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CollectionCard
