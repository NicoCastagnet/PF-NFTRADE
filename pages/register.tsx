// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import darkImage from '@assets/logoDark.png'
import lightImage from '@assets/logoLight.png'
import { useFormik } from 'formik'
import {
  handleBlurEmail,
  handleBlurPassword,
  handleBlurUserName,
  registerValidate,
} from 'hook/validate'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi'
import styles from '../styles/form.module.css'

const SignIn: NextPage = () => {
  const { data: session, status } = useSession()
  const [show, setShow] = useState({ password: false, cpassword: false })
  const router = useRouter()
  const { theme } = useTheme()

  useEffect(() => {
    if (session) router.push('/')
  }, [router, session, status])

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: registerValidate,
    onSubmit,
  })
  async function onSubmit(values: {
    username: string
    email: string
    password: string
    cpassword: string
  }) {
    try {
      const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      }
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signup`, options)
        .then((res) => res.json())
        .then((res) => {
          if (res.msg === 'ok') router.push('/login')
        })
    } catch (error) {
      toast.error('An error occurred while registering.', { duration: 3000 })
      router.push('/register')
    }
  }

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0 bg-gray-200 dark:bg-[#202225] transition-all">
        <Head>
          <title>NFTrade | Register</title>
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
                Join our world
              </h1>
              <h3 className="reg-subtitle text-xl text-left text-gray-600 dark:text-gray-400">
                Tell us about you...
              </h3>
              <form
                className="flex flex-col items-center py-4 gap-8 w-full"
                onSubmit={formik.handleSubmit}
              >
                <div
                  className={`flex border rounded-xl  w-4/5 px-4 py-1 justify-between text-lg ${
                    formik.errors.username && formik.touched.username
                      ? 'border-rose-600'
                      : ''
                  }`}
                >
                  <input
                    className={`bg-transparent focus:outline-none w-full text-gray-600 dark:text-gray-400 ${styles.input_text}`}
                    type="text"
                    placeholder={'Username'}
                    {...formik.getFieldProps('username')}
                    onBlur={handleBlurUserName}
                  />
                  <span className="icon flex items-center pl-2">
                    <HiOutlineUser size={28} />
                  </span>
                </div>
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
                    onBlur={handleBlurEmail}
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
                    type={`${show.password ? 'text' : 'password'}`}
                    placeholder={'Password'}
                    {...formik.getFieldProps('password')}
                    onBlur={handleBlurPassword}
                  />
                  <span
                    className="icon flex items-center pl-2"
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                  >
                    <HiFingerPrint size={28} />
                  </span>
                </div>

                <div
                  className={`flex border rounded-xl relative w-4/5 px-4 py-1 justify-between text-lg ${
                    formik.errors.cpassword && formik.touched.cpassword
                      ? 'border-rose-600'
                      : ''
                  }`}
                >
                  <input
                    className={`bg-transparent focus:outline-none w-full text-gray-600 dark:text-gray-400 ${styles.input_text}`}
                    type={`${show.cpassword ? 'text' : 'password'}`}
                    placeholder={'Confirm Password'}
                    {...formik.getFieldProps('cpassword')}
                    onBlur={handleBlurPassword}
                  />
                  <span
                    className="icon flex items-center pl-2"
                    onClick={() =>
                      setShow({ ...show, cpassword: !show.cpassword })
                    }
                  >
                    <HiFingerPrint size={28} />
                  </span>
                </div>
                <button
                  className="bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-white transition-all rounded-full py-2 text-lg w-4/5 hover:scale-105 font-bold uppercase"
                  type="submit"
                >
                  Register
                </button>
              </form>
            </div>

            <p className="text-center text-sm mt-3 text-gray-600 dark:text-gray-400">
              already have an account?{' '}
              <Link href={'/login'}>
                <a className="text-blue-700 dark:text-blue-500 hover:underline transition-all">
                  log in
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

export default SignIn
