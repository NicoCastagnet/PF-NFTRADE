import whiteLogo from '@assets/White.png'
import SvgFacebook from '@components/icons/svgFacebook'
import Image from 'next/image'
import SvgGitHub from './icons/svgGitHub'
import SvgInstagram from './icons/svgInstagram'
import SvgLinkedIn from './icons/svgLinkedIn'
import SvgTwitter from './icons/svgTwitter'

export default function Footer() {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-900">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0 text-white">
          <a href="https://flowbite.com/" className="flex items-center">
            <Image src={whiteLogo} alt="white_logo" height={80} width={150} />
          </a>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Resources
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <a
                  href="https://localhost:3000/about"
                  className="hover:underline"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="https://localhost:3000/marketplace"
                  className="hover:underline"
                >
                  Marketplace
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Follow us
            </h2>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-4">
                <a href="#" className="hover:underline ">
                  Github
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Linkedin
                </a>
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
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <SvgFacebook
              className="h-5 w-5"
              color0="currentColor"
              color1="currentColor"
              color2="rgb(17 24 39)"
            />
            <span className="sr-only">Facebook page</span>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <SvgInstagram className="w-5 h-5" />
            <span className="sr-only">Instagram page</span>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <SvgTwitter
              className="h-5 w-5"
              color="currentColor"
              color1="rgb(17 24 39)"
            />
            <span className="sr-only">Twitter page</span>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <SvgGitHub className="w-5 h-5" />
            <span className="sr-only">GitHub account</span>
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            <SvgLinkedIn
              className="h-5 w-5"
              color="currentColor"
              color1="rgb(17 24 39)"
            />
            <span className="sr-only">Linkedin account</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
