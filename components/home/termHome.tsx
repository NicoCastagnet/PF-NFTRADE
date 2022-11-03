import NFT2 from '@assets/term.png'
import Image from 'next/image'
import Link from 'next/link'

const TermHome = () => {
  return (
    <section className="home__about flex items-center justify-center ">
      <div className="flex flex-row justify-center items-center content-center my-14 max-lg:mt-0 max-lg:mb-0 max-w-7xl">
        <div className="home__about-right ease duration-500 max-lg:hidden">
          <Image src={NFT2} alt="term_img" height={650} width={710} />
        </div>
        <div className="home__term-left p-8 w-full max-w-2xl">
          <p className="left-title text-5xl font-bold tracking-wide max-md:text-3xl">
            Why choosing us?
          </p>
          <p className="mt-10 max-md:mt-5 mb-10 max-md:text-sm ease duration-500">
            You agree that by accessing the Services, you have read, understood,
            and agreed to be bound by all of these Terms. If you do not agree
            with all of these Terms, then you are expressly prohibited from
            using the Services and you must discontinue use immediately. You are
            not permitted to access the Services if you engage in any activity
            in violation of regulations administered by the US Foreign Asset
            Control or any other relevant sanctions authorities. This includes
            if you: (a) are or are acting on behalf of any other person who is
            (or if you are an entity, you are owned or controlled by any other
            person who is), identified on any list of prohibited parties,
            including the U.S. Treasury Department’s Specially Designated
            Nationals list and Foreign Sanctions Evaders list; or (b) are
            located, ordinarily resident, organized, established, or domiciled
            in a jurisdiction that is subject to a comprehensive U.S. embargo.
          </p>
          <Link href="/term">
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

export default TermHome
