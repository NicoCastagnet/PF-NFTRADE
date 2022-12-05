// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import LogoWhite from '@assets/Logo-big-white.png'
import Logo from '@assets/Logo-big.png'
import NavBar from '@components/navbar/navbar'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'

const About = () => {
  const { theme } = useTheme()
  return (
    <main className="h-screen w-full bg-gray-200 dark:bg-[#202225] transition-all">
      <NavBar />
      <div className="h-screen w-full flex flex-col justify-center items-center">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:5/12 lg:w-5/12 bg-white dark:bg-[#303339] rounded-xl">
              <Image
                src={theme === 'light' ? Logo : LogoWhite}
                alt="alt"
                height={720}
                width={720}
              />
            </div>
            <div className="md:7/12 lg:w-6/12 flex flex-col">
              <h2 className="text-2xl text-gray-600 dark:text-white font-bold md:text-4xl">
                <span className="text-blue-600 uppercase">Nftrade</span> is
                carried out by passionate developers.
              </h2>
              <p className="mt-6 text-gray-600 dark:text-gray-400">
                NFTrade is a project made by a group of 5 students from{' '}
                <span className="text-blue-600 hover:underline cursor-pointer">
                  Henry Bootcamp
                </span>
                The project is based on creating a full functional website. In
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
              <div className="mt-7 w-full">
                <Link href="/">
                  <a className="w-full ml-1 bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-white transition-all cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center max-sm:text-sm max-sm:p-2">
                    <button>Return home</button>
                  </a>
                </Link>
                <Link href="/team">
                  <a className="w-full ml-1 bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-white transition-all cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center max-sm:text-sm max-sm:p-2">
                    <button className="max-sm:text-sm max-sm:w-auto">
                      Meet the team
                    </button>
                  </a>
                </Link>
                <Link href="https://github.com/NicoCastagnet/PF-NFTRADE">
                  <a
                    target="_blank"
                    rel="norefeerer"
                    className="w-full ml-1 bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-white transition-all cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center max-sm:text-sm max-sm:p-2"
                  >
                    <button className="max-sm:text-sm max-sm:w-auto">
                      Repository
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
