// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import darkImage from '@assets/logoDark.png'
import lightImage from '@assets/logoLight.png'
import SvgFacebook from '@components/icons/svgFacebook'
import SvgGoogle from '@components/icons/svgGoogle'
import SvgLinkedIn from '@components/icons/svgLinkedIn'
import SvgTwitter from '@components/icons/svgTwitter'
import { useFormik } from 'formik'
import { login_valid } from 'hook/validate'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi'
import useInfoProviders from '../hook/providers'
import styles from '../styles/form.module.css'

const LogIn: NextPage = () => {
  const { theme } = useTheme()
  const [show, setShow] = useState(false)
  const router = useRouter()
  const { data: session, status } = useSession()
  const { providers } = useInfoProviders()
  useEffect(() => {
    if (session) router.push('/')
  }, [router, session, status])
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: login_valid,
    onSubmit,
  })

  async function onSubmit(values: { email: string; password: string }) {
    try {
      const lucas = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: '/',
      })
      const yo = await JSON.stringify(lucas, null)
      if (!yo.includes('true')) {
        toast.error('Something went wrong. Try again!')
      }
    } catch (error) {
      toast.error('An error occurred while logging in', { duration: 5000 })
      router.push('/login')
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <span className={styles.loadding}></span>
      </div>
    )
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0 bg-gray-200 dark:bg-[#202225] transition-all">
        <Head>
          <title>NFTrade | Log in</title>
        </Head>
        <div className="flex flex-col sm:flex-row justify-center items-center w-full">
          <div className="flex flex-col items-center justify-center w-full max-w-md bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-[#202225] dark:border-gray-700 pb-5">
            <div className="flex items-center cursor-pointer">
              <Link href="/">
                <a>
                  <Image
                    src={theme === 'light' ? lightImage : darkImage}
                    alt="logo"
                    height={150}
                    width={260}
                  />
                </a>
              </Link>
            </div>
            <div className="flex flex-col items-center w-full">
              <h1 className=" text-4xl font-semibold text-gray-600 dark:text-white">
                Welcome back
              </h1>
              <h3 className="reg-subtitle text-xl text-left text-gray-600 dark:text-gray-400">
                Please, enter your credentials to continue
              </h3>
              <form
                className="flex flex-col items-center py-4 gap-8 w-full"
                onSubmit={formik.handleSubmit}
              >
                <div
                  className={`flex border rounded-xl relative w-4/5 px-4 py-1 justify-between text-lg ${
                    formik.errors.email && formik.touched.email
                      ? 'border-rose-600'
                      : ''
                  }`}
                >
                  <input
                    className={`bg-transparent focus:outline-none w-full text-gray-600 dark:text-gray-400 ${styles.input_text}`}
                    type="email"
                    placeholder={'Email'}
                    {...formik.getFieldProps('email')}
                  />
                  <span className="icon flex items-center pl-2">
                    <HiAtSymbol size={28} />
                  </span>
                </div>
                <div
                  className={`flex border rounded-xl relative w-4/5 px-4 py-1 justify-between text-lg ${
                    formik.errors.password && formik.touched.password
                      ? 'border-rose-600'
                      : ''
                  }`}
                >
                  <input
                    className={`bg-transparent focus:outline-none w-full text-gray-600 dark:text-gray-400 ${styles.input_text}`}
                    type={`${show ? 'text' : 'password'}`}
                    placeholder={'Password'}
                    {...formik.getFieldProps('password')}
                  />
                  <span
                    className="icon flex items-center pl-2"
                    onClick={() => setShow(!show)}
                  >
                    <HiFingerPrint
                      size={28}
                      className={`${show ? 'fill-[#6366f1]' : ''}`}
                    />
                  </span>
                </div>

                <button
                  className="bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-white transition-all rounded-full py-2 text-lg w-4/5 hover:scale-105 font-bold uppercase"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
            <div className="flex flex-row justify-evenly items-center w-3/5">
              {providers?.google && (
                <button
                  className="hover:scale-125 transition-transform"
                  onClick={async () => {
                    await signIn(providers.google.id)
                  }}
                >
                  <SvgGoogle />
                </button>
              )}
              {providers?.facebook && (
                <button
                  className="hover:scale-125 transition-transform"
                  onClick={async () => {
                    await signIn(providers.facebook.id)
                  }}
                >
                  <SvgFacebook />
                </button>
              )}

              {providers?.twitter && (
                <button
                  className="hover:scale-125 transition-transform"
                  onClick={async () => {
                    await signIn(providers.twitter.id)
                  }}
                >
                  <SvgTwitter />
                </button>
              )}

              {providers?.linkedin && (
                <button
                  className="hover:scale-125 transition-transform"
                  onClick={async () => {
                    await signIn(providers.linkedin.id)
                  }}
                >
                  <SvgLinkedIn />
                </button>
              )}
            </div>
            <p className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400">
              don&apos;t have an account yet?{' '}
              <Link href={'/register'}>
                <a className="text-blue-700 dark:text-blue-500 hover:underline transition-all">
                  register
                </a>
              </Link>
            </p>
            <p className="text-center text-sm mt-3 text-gray-400">
              <Link href={'/forgottenPass'}>
                <a className="text-blue-700 dark:text-blue-500 hover:underline transition-all">
                  I forgot my password
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default LogIn
