import NFT2 from '@assets/NFT_5.png'
import Image from 'next/image'
import Link from 'next/link'

const AboutHome = () => {
  return (
    <section className="home__about flex items-center justify-center content-center m-14 w-[80%]">
      <div className="home__about-right">
        <Image src={NFT2} alt="nft2_img" height={650} width={710} />
      </div>
      <div className="home__about-left ml-16 w-[60%]">
        <p className="left-title text-5xl font-bold tracking-wide">
          Why choosing us?
        </p>
        <p className="mt-10 mb-10">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
          molestiae doloribus voluptatibus. Laudantium, reiciendis! Architecto
          illo commodi natus maxime fugiat cupiditate, et ducimus similique
          earum exercitationem, sit dolorem asperiores expedita!
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
    </section>
  )
}

export default AboutHome
