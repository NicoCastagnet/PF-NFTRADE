import SvgNewTab from '@components/icons/svgNewTab'
import SvgTrash from '@components/icons/svgTrash'
import useDetail from 'hook/useDetail'
import Image from 'next/image'

const Nfts = ({ id, image, name, published, price, views, likes, nft }) => {
  const {
    session,
    subState,
    setSubState,
    addToWished,
    deleteNft,
    handlePublished,
    putPrice,
  } = useDetail(nft)

  return (
    <div
      key={id}
      className={`h-auto w-[22rem] m-2 overflow-hidden relative flex flex-col rounded-xl p-[1px] cursor-pointer group drop-shadow-lg`}
    >
      <div
        className={`h-auto w-[22rem] overflow-hidden relative flex flex-col bg-white dark:bg-[#303339] rounded-xl p-[1px] cursor-pointer group`}
      >
        <SvgTrash
          className="absolute z-50 h-6 w-6 left-[19.5rem] m-2 dark:fill-[#979797] dark:hover:fill-red-600 transition-all"
          onClick={deleteNft}
        />
        <a
          href={`http://localhost:3000/nfts/${id}`}
          target="_blank"
          rel="noreferrer"
        >
          <SvgNewTab className="absolute z-50 h-5 w-5 m-2 dark:fill-[#979797] dark:hover:fill-blue-600 transition-all" />
        </a>
        <div className="rounded-xl border-spacing-2 h-[20rem]">
          <Image
            src={image}
            height={370}
            width={400}
            quality={20}
            alt={`image-${name}`}
            className="rounded-t-xl object-cover group-hover:scale-110 transition duration-300 ease-in-out overflow-auto"
          />
        </div>
        <div className="flex flex-col p-4 h-full w-full justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row w-full justify-between">
              <h5
                className={`text-2xl text-gray-800 dark:text-white font-bold truncate ease duration-300`}
              >
                {name}
              </h5>
            </div>
            <button
              className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#393b41] dark:hover:bg-[#4c4e53] transition-all text-lg font-semibold w-full h-10 my-1"
              onClick={handlePublished}
            >
              Click to{' '}
              {published ? 'remove the nft from market' : 'publish the nft'}
            </button>
            <button className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#393b41] dark:hover:bg-[#4c4e53] transition-all text-lg font-semibold w-full h-10 my-1">
              <p>
                NFT price:{' '}
                <input
                  className="bg-white hover:bg-gray-300 text-black dark:text-white dark:bg-[#4c4e53] dark:hover:bg-[#393b41] text-lg text-center font-semibold w-20 rounded-md mx-1 transition-all outline-none focus:outline-none"
                  type="number"
                  placeholder={price}
                />
              </p>
            </button>
          </div>
          <div className="flex flex-row justify-between items-center text-lg text-gray-800 dark:text-white font-semibold mt-2">
            <div className="flex flex-row justify-center items-center gap-2 ">
              <p>NFT Views: </p>
              <span>{views.length}</span>
            </div>
            <div className="flex flex-row justify-center items-center gap-2">
              <p>NFT Likes: </p>
              <span>{likes.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nfts
