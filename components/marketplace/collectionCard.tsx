// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import SvgCoin from '@components/icons/svgCoin'
import { useCart } from '@context/cart'
import styles from '@styles/form.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { toast, Toaster } from 'react-hot-toast'
import { RiVipCrownFill } from 'react-icons/ri'

const CollectionCard = ({
  nft,
  id,
  carSize,
  name,
  description,
  owner,
  price,
  image,
}) => {
  const { cart, addItem } = useCart()

  return (
    <>
      <div
        className={` ${
          carSize === 'bigger'
            ? 'sm:h-[32.5rem] sm:w-[22rem] w-[63%] overflow-hidden'
            : carSize === 'small'
            ? 'sm:h-[27.5rem] sm:w-[18rem] w-[63%] overflow-hidden '
            : ''
        }  relative flex flex-col rounded-xl overflow-hidden p-[1px] cursor-pointer group drop-shadow-lg`}
      >
        <Link href={`/collections/${id}`} key={id}>
          <a>
            <div
              className={` ${
                carSize === 'bigger'
                  ? 'sm:h-[32.5rem] sm:w-[22rem] w-full overflow-hidden'
                  : carSize === 'small'
                  ? 'sm:h-[27.5rem] sm:w-[18rem] w-full overflow-hidden'
                  : ''
              }  relative flex flex-col bg-white dark:bg-[#303339] rounded-xl overflow-auto p-[1px] cursor-pointer group`}
            >
              <div className="rounded-xl border-spacing-2 sm:h-[20rem]">
                <Image
                  src={image}
                  height={carSize === 'small' ? 350 : 370}
                  width={400}
                  quality={20}
                  alt={`image-${name}`}
                  className="rounded-t-xl object-cover group-hover:scale-110 transition duration-300 ease-in-out overflow-auto"
                />
              </div>
              <div className="flex flex-col p-4 pb-3 h-full w-full justify-between">
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="flex flex-row w-full justify-between">
                    <h5
                      className={`${
                        carSize === 'small' ? 'text-xl' : 'text-2xl'
                      } text-gray-800 dark:text-white font-bold truncate ease duration-300`}
                    >
                      {name}
                    </h5>
                  </div>
                  <div
                    className={`${styles.description} ${
                      carSize === 'small' ? 'text-sm' : ''
                    } ease duration-300 text-gray-800 dark:text-white w-full my-3`}
                  >
                    {description ? description : 'No description provided.'}
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <div className="flex flex-row justify-center items-center gap-2 truncate">
                    <span>
                      <RiVipCrownFill className="fill-yellow-500" />
                    </span>
                    <p
                      className={`${
                        carSize === 'small' ? 'text-base' : 'text-xl'
                      } text-gray-800 dark:text-white font-semibold  truncate ease duration-300`}
                    >
                      {owner.name}
                    </p>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-2">
                    <span>
                      <SvgCoin
                        height={20}
                        width={20}
                        className={'fill-gray-800 dark:fill-white'}
                      />
                    </span>
                    <span className="text-gray-800 dark:text-white font-semibold text-xl">
                      {price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Link>
        <button
          className={`translate-y-10 group-hover:translate-y-0 transition-all absolute bg-blue-600 w-full rounded-b-xl text-center py-2 z-[3] font-semibold text-1xl left-0 bottom-0`}
          onClick={() => {
            addItem(nft)
            cart.find((e) => e.name === nft.name)
              ? toast.error('You have already added this NFT to the cart!')
              : toast.success('NFT added to the cart!')
          }}
        >
          Add to cart
        </button>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default CollectionCard
