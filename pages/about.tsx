import nft_image from '@assets/nft-cost.jpg'
import NavBar from '@components/navbar/navbar'
import Image from 'next/image'

const About = () => {
  return (
    <main className="h-screen w-full bg-gray-200 dark:bg-[#202225] transition-all">
      <NavBar />
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:5/12 lg:w-5/12">
              <Image src={nft_image} alt="alt" height={600} width={500} />
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-2xl text-gray-600 dark:text-white font-bold md:text-4xl">
                <span className="text-blue-600 uppercase">Nftrade</span> is
                carried out by passionate developers.
              </h2>
              <p className="mt-6 text-gray-600 dark:text-gray-400">
                NFTrade is a project made by a group of 7 students from{' '}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Henry Bootcamp
                </span>
                . The project is based on creating a full functional website. In
                our case, we decided to make a kind of Marketplace of NFT&apos;s
                including our own payment method implemented on the main app. In
                this project we were working with the following technologies:
                Next.JS, TypeScript, Tailwind, PostreSQL & Prisma.
              </p>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                {' '}
                Learn more about this project checking the public repository or
                looking at the LinkedIN post!
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
