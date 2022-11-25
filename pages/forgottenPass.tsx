// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// react-hooks/rules-of-hooks

import pwdImage from '@assets/White.png'
import axios from 'axios'
import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const ForgottenPass: NextPage = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/resetpass`, {
      email: email,
    })
  }

  return (
    <section className="flex bg-gray-200 dark:bg-[#202225] transition-all w-screen h-screen">
      <div className="flex flex-col items-center justify-center px-6 mx-auto">
        <div className="flex items-center cursor-pointer">
          <Link href="/">
            <Image src={pwdImage} alt="logo" height={150} width={260} />
          </Link>
        </div>
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border dark:bg-[#202225] dark:border-gray-700">
          <h2 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
            Change Password
          </h2>
          <span className="text-sm">
            We get it, stuff happens. Just enter your email address below and
            we&apos;ll send you a new password!
          </span>
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
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
                className="transition-all bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:border-gray-600 dark:focus:bg-[#393b41] dark:placeholder-gray-400 dark:text-white outline-none"
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
