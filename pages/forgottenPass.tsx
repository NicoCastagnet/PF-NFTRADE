// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// react-hooks/rules-of-hooks

import axios from 'axios'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import pwdImage from '@ssets/White.png'

const ForgottenPass: NextPage = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/resetpass`, {
      email: email,
    })
  }

  return (
    <section className="bg-gray-200 dark:bg-[#202225] transition-all">
      <div className="flex flex-col items-center justify-center px-6 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center cursor-pointer">
          <Link href="/">
            <Image src={pwdImage} alt="logo" height={150} width={260} />
          </Link>
        </div>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-[#202225] dark:border-gray-700 sm:p-8">
          <h2 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <span className="text-sm">
            We get it, stuff happens. Just enter your email address below and
            we&apos;ll send you a new password!
          </span>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="transition-all bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:border-gray-600 dark:focus:bg-[#393b41] dark:placeholder-gray-400 dark:text-white outline-none"
                placeholder="name@company.com"
                required=""
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex">
              <button
                type="submit"
                className="w-full mr-1 bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-white transition-all cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Reset password
              </button>
              <Link href="/">
                <a className="w-full ml-1 bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-white transition-all cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  <button>Return home</button>
                </a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ForgottenPass
