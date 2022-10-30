import SvgHeart from '@components/icons/svgHeart'
import Image from 'next/image'
import styles from '../../styles/form.module.css'

const TopContainer = ({ nfts }: { nfts: any }) => {
  if (!nfts) return <div>loading...</div>

  return (
    <>
      <div className="home__top-container flex items-center justify-evenly w-auto rounded-lg mb-16 bg-gray-800">
        {nfts &&
          nfts.map((e: any) => {
            return (
              <div
                key={e.id}
                className="init-card max-w-sm m-16 rounded-lg border shadow-md bg-gray-800 border-gray-700"
              >
                <a href="#">
                  <Image
                    className="rounded-t-lg"
                    src={e.image}
                    alt="ds"
                    width={1000}
                    height={1000}
                    layout="intrinsic"
                  />
                </a>
                <div className="p-5">
                  <div className="title flex flex-row items-center justify-between">
                    <a href="#">
                      <h5
                        className={`text-2xl font-bold tracking-tight text-gray-900 dark:text-white ${styles.nft_title}`}
                      >
                        {e.name}
                      </h5>
                    </a>
                    <div className="likes flex text-white font-semibold items-center justify-center text-center gap-3 bg-gray-500 rounded-full w-16 h-8">
                      {e._count.likedBy}{' '}
                      <SvgHeart
                        height={20}
                        width={20}
                        className="hover:fill-red-600 transition-all"
                      />
                    </div>
                  </div>
                </div>
                <p className="my-3 px-5 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <a
                  href="#"
                  className="inline-flex my-5 ml-5 items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    aria-hidden="true"
                    className="ml-2 -mr-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div>
            )
          })}
      </div>
    </>
  )
}

export default TopContainer
