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
  return (
    <div
      key={nft.id}
      className={`w-[30%] mr-6 mb-6 max-w-[277px] min-w-[194px] h-[300px] overflow-hidden relative flex flex-col h- bg-white dark:bg-[#303339] rounded-xl p-[1px] cursor-pointer group`}
    >
      <Link href={`/nfts/${nft.id}`} key={nft.id}>
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
          <div className="flex flex-col p-4 w-full justify-between">
            <div className="flex flex-col gap-2">
              <h5
                className={`text-xl text-white truncate font-semibold mb-2 ease duration-300`}
              >
                {nft.name}
              </h5>
            </div>
            <div className="flex flex-row justify-between items-center mb-6">
              <div className="flex flex-row justify-center items-center gap-2">
                <span>
                  <SvgCoin height={20} width={20} className={'fill-white'} />
                </span>
                <span className="text-white font-semibold text-xl">
                  {nft.price} coins.
                </span>
              </div>
            </div>
            {/* <button className="w-full text-xl bg-white hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#2b2c2e] dark:hover:bg-[#393b41] transition-all py-3 rounded-xl mr-2 max-sm:py-3 max-sm:text-lg">
              See details
            </button> */}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default NftCard
