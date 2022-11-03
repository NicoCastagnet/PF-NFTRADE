import whiteLogo from '@assets/White.png'
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-900 w-full">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0 text-white">
          <Link href="/">
            <Image
              src={whiteLogo}
              alt="white_logo"
              height={80}
              width={150}
              className="flex items-center cursor-pointer"
            />
          </Link>
          <p className="w-[17rem] text-gray-400">
            NFTrade is a project made by students from{' '}
            <span className="underline text-blue-500 cursor-pointer">
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
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Resources
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4 hover:underline">
                <Link href="/about" className="hover:underline">
                  About us
                </Link>
              </li>
              <li className="mb-4 hover:underline">
                <Link href="/marketplace">Marketplace</Link>
              </li>
              <li className="hover:underline">
                <Link href="/team">Meet the team</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Legal
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
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
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
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
