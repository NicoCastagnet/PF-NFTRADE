import NFT2 from '@assets/about.png'
import Image from 'next/image'
import Link from 'next/link'

const AboutHome = () => {
  return (
    <section className="home__about flex items-center justify-center ">
      <div className="flex flex-row justify-center items-center content-center my-14 max-lg:mt-0 max-lg:mb-0 max-w-7xl">
        <div className="home__about-right ease duration-500 max-lg:hidden">
          <Image src={NFT2} alt="about_img" height={650} width={710} />
        </div>
        <div className="home__about-left p-8 w-full max-w-2xl">
          <p className="left-title text-5xl font-bold tracking-wide max-md:text-3xl">
            Why choosing us?
          </p>
          <p className="mt-10 max-md:mt-5 mb-10 max-md:text-sm ease duration-500">
            About NFTrade NFTrade is the first calendar in the NFT Universe. We
            cover the most eye-catching drops, exciting events, and high-profile
            releases that keep the wheels of the Non-Fungible Token industry
            turning! We feature the releases of both well-known and fledgling
            artists who drop their collections or single pieces on various
            marketplaces and platforms. The mission of the NFTrade is to support
            the creators and contribute to their development in the crypto art
            field. That’s why any creator can add his drop or event in the
            NFTrade for free. There is also a knowledge base on our platform
            where beginners can clarify a lot about minting, selling, and
            promoting their non-fungible tokens. Besides, we keep an eye on
            everything happening in the industry and cover current news and
            events for our community to stay updated. We value the time and
            effort of each person who has joined the non-fungible movement. That
            is why we created a hub in the Universe of digital collectibles that
            is always there for you when it comes to NFT releases, news, and
            events. With love and respect for all NFT Collectors and the
            Community of crypto art connoisseurs! Support us We are working hard
            to empower creators and publishers on a daily basis.
          </p>
          <Link href="/about">
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

export default AboutHome
