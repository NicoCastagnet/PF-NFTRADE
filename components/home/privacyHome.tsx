import NFT2 from '@assets/privacy.png'
import Image from 'next/image'
import Link from 'next/link'

const PrivacyHome = () => {
  return (
    <section className="home__about flex items-center justify-center ">
      <div className="flex flex-row justify-center items-center content-center my-14 max-lg:mt-0 max-lg:mb-0 max-w-7xl">
        <div className="home__about-right ease duration-500 max-lg:hidden">
          <Image src={NFT2} alt="privacy_img" height={650} width={710} />
        </div>
        <div className="home__about-left p-8 w-full max-w-2xl">
          <p className="left-title text-5xl font-bold tracking-wide max-md:text-3xl">
            Why choosing us?
          </p>
          <p className="mt-10 max-md:mt-5 mb-10 max-md:text-sm ease duration-500">
            We care about data privacy and security. By using the Services, you
            agree to be bound by our Privacy Policy , which is incorporated into
            these Terms. Please be advised the Services are hosted in the United
            States. If you access the Services from any other region of the
            world with laws or other requirements governing personal data
            collection, use, or disclosure that differ from applicable laws in
            the United States, then through your continued use of the Services,
            you are transferring your data to the United States, and you agree
            to have your data transferred to and processed in the United States.
          </p>
          <Link href="/privacy">
            <button
              type="button"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 font-medium rounded-full text-sm py-2 px-7 text-center"
            >
              Read more
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PrivacyHome
