import SvgCoin from '@components/icons/svgCoin'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  nft: Nft
}

interface Nft {
  id: string
  name: string
  image: string
  price: number
}

const NftCard = ({ nft }: Props) => {
  console.log(nft)
  return (
    <div
      key={nft.id}
      className={`w-[30%] mr-6 mb-6 max-w-[277px] min-w-[194px] h-[300px] overflow-hidden relative flex flex-col bg-slate-900 dark:bg-stone-900 dark:border-[1px] rounded-xl p-[1px] dark:border-gray-400 cursor-pointer group shadow-lg shadow-zinc-500`}
    >
      <Link href={`/nfts/${nft.id}`} key={nft.id}>
        {/* // h-[35rem] w-[22rem] */}
        <div>
          <div className="rounded-xl border-spacing-2 ">
            <Image
              src={nft.image}
              height={300}
              width={400}
              quality={20}
              alt={`image-${nft.name}`}
              className="rounded-t-xl object-cover group-hover:scale-110 transition duration-300 ease-in-out overflow-auto"
            />
          </div>
          <div className="flex flex-col p-4 w-full justify-between ">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row w-full justify-between">
                <h5
                  className={`text-xl text-white font-bold truncate ease duration-300`}
                >
                  {nft.name}
                </h5>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center mb-6">
              <div className="flex flex-row justify-center items-center gap-2">
                <span>
                  <SvgCoin height={20} width={20} className={'fill-white'} />
                </span>
                <span className="text-white font-semibold text-xl">
                  {nft.price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NftCard
