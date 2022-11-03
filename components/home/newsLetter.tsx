import Newsletter from '@assets/newsletter.png'
import SvgMail from '@components/icons/svgMail'
import Image from 'next/image'

const NewsLetter = () => {
  return (
    <section className="home__newsletter flex items-center justify-center w-full ">
      <div className="flex flex-row justify-center items-center max-w-7xl m-14 max-lg:max-w-2xl max-sm:m-8">
        <div className="home__newsletter-left">
          <p className="left-title text-5xl font-bold tracking-wide w-4/5 max-md:text-2xl ">
            Subscribe to receive all the{' '}
            <span className="font-extrabold text-blue-600 uppercase">news</span>{' '}
            and{' '}
            <span className="font-extrabold text-blue-600 uppercase">
              offers
            </span>{' '}
            daily!
          </p>
          <p className="mt-10 mb-10 w-4/5 max-md:text-sm max-md:my-4">
            Find out about all the news, promotions, discounts, events and much
            more subscribing to our news letter. It is easy, just leave us your
            email and we will take care of the rest!
          </p>
          <form className=" max-md:w-full">
            <div className="relative  max-md:w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <SvgMail />
              </div>
              <input
                type="search"
                id="default-search"
                className="block p-4 pl-10 pr-28 w-4/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-200 max-md:w-full max-md:pr-[5.5rem]"
                placeholder="Enter your e-mail"
                required
              />
              <button
                type="submit"
                className="text-white absolute right-[21%] bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2 max-md:right-[3%]"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className="home__newsletter-right max-xl:hidden bg-blue-500 rounded-full ease duration-500">
          <Image src={Newsletter} alt="nft2_img" height={850} width={890} />
        </div>
      </div>
    </section>
  )
}

export default NewsLetter
