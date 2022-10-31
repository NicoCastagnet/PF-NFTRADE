import Newsletter from '@assets/newsletter.png'
import SvgMail from '@components/icons/svgMail'
import Image from 'next/image'

const NewLetter = () => {
  return (
    <section className="home__newsletter flex flex-row-reverse items-center w-11/12 m-16">
      <div className="home__about-right bg-blue-500 rounded-full">
        <Image src={Newsletter} alt="nft2_img" height={850} width={890} />
      </div>
      <div className="home__about-left">
        <p className="left-title text-5xl font-bold tracking-wide w-4/5">
          Subscribe to receive all the{' '}
          <span className="font-extrabold text-blue-600 uppercase">news</span>{' '}
          and{' '}
          <span className="font-extrabold text-blue-600 uppercase">offers</span>{' '}
          daily!
        </p>
        <p className="mt-10 mb-10 w-4/5">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
          molestiae doloribus voluptatibus. Laudantium, reiciendis! Architecto
          illo commodi natus maxime fugiat cupiditate, et ducimus similique
          earum exercitationem, sit dolorem asperiores expedita!
        </p>
        <form>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <SvgMail />
            </div>
            <input
              type="search"
              id="default-search"
              className="block p-4 pl-10 w-4/5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-200"
              placeholder="Enter your e-mail"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-[19rem] bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default NewLetter
