import whiteLogo from '@assets/White.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="p-4 bg-slate-900 dark:bg-[#1c1d20] sm:p-6 w-full">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <Link href="/">
            <a>
              <Image
                src={whiteLogo}
                alt="white_logo"
                height={80}
                width={150}
                className="flex items-center cursor-pointer"
              />
            </a>
          </Link>
          <p className="w-[17rem] text-gray-400">
            NFTrade is a project made by students from{' '}
            <span className="underline text-blue-600 cursor-pointer">
              <a
                href="https://www.soyhenry.com"
                target="_blank"
                rel="noreferrer"
              >
                Henry Bootcamp
              </a>
            </span>
            . Based on a NFT&apos;s marketplace using Next.JS, TypeScript,
            Tailwind & PostreSQL with Prisma
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              Resources
            </h2>
            <ul className="text-gray-400">
              <li className="mb-4 hover:underline">
                <Link href="/about" className="hover:underline">
                  <a>About us</a>
                </Link>
              </li>
              <li className="mb-4 hover:underline">
                <Link href="/marketplace">
                  <a>Marketplace</a>
                </Link>
              </li>
              <li className="hover:underline">
                <Link href="/team">
                  <a>Meet the team</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase text-white">
              Legal
            </h2>
            <ul className="text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-6 border-slate-700 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm sm:text-center text-gray-400">
          © 2022{' '}
          <a href="#" className="hover:underline">
            NFTRADE™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}
