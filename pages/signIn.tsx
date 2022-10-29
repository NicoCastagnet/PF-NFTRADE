// import whiteLogo from '../Assets/logo@1,25x.png';
import { useFormik } from 'formik'
import {
  handleBlurEmail,
  handleBlurPassword,
  handleBlurUserName,
  registerValidate,
} from 'hook/validate'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from 'react-icons/hi'
import whiteLogo from '../assets/logo@1,25x.png'
import regImage from '../assets/nft-cost.jpg'
import styles from '../styles/form.module.css'
//
//
const SignIn: NextPage = () => {
  //////////////////////////////////////////////////
  const { data: session, status } = useSession()
  const [show, setShow] = useState({ password: false, cpassword: false })

  const router = useRouter()
  ////////////////////////////////////////////////
  useEffect(() => {
    if (session) router.push('/')
  }, [status])
  /////////////////////////////////////
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
      await fetch('api/auth/signup', options)
        .then((res) => res.json())
        .then((res) => {
          if (res.msg === 'ok') router.push('/logIn')
        })
    } catch (error) {
      toast.error('an error occurred while registering', { duration: 3000 })
      router.push("/signIn")
    }
  }
  ////////////////////////////////////////////////////////////////
  return (
    <>
      <Head>
        <title>SignIn</title>
      </Head>

      <div className="flex flex-col items-center justify-start w-full min-h-screen">
        <div className="flex flex-row items-start pl-6 w-full">
          <Image src={whiteLogo} alt="white_logo" height={80} width={150} />
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center w-full">
          <div className="flex flex-col items-center justify-center w-full max-w-md mt-4">
            <div className="flex flex-col items-center w-full">
              <h1 className="reg-title text-4xl font-semibold">
                Join our world
              </h1>
              <h3 className="reg-subtitle text-lg text-left text-gray-500">
                {"Let's get started!"}
              </h3>
              <form
                className="flex flex-col items-center py-4 gap-5 w-full"
                onSubmit={formik.handleSubmit}
              >
                <div
                  className={`flex border rounded-xl relative w-4/5 px-4 py-1 justify-between text-lg ${
                    formik.errors.username && formik.touched.username
                      ? 'border-rose-600'
                      : ''
                  }`}
                >
                  <input
                    className={`bg-transparent focus:outline-none ${styles.input_text}`}
                    type="text"
                    placeholder={'UserName'}
                    {...formik.getFieldProps('username')}
                    onBlur={handleBlurUserName}
                  />
                  <span className="icon flex items-center px-4">
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
                    className={`bg-transparent focus:outline-none ${styles.input_text}`}
                    type="email"
                    placeholder={'Email'}
                    {...formik.getFieldProps('email')}
                    onBlur={handleBlurEmail}
                  />
                  <span className="icon flex items-center px-4">
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
                    className={`bg-transparent focus:outline-none ${styles.input_text}`}
                    type={`${show.password ? 'text' : 'password'}`}
                    placeholder={'Password'}
                    {...formik.getFieldProps('password')}
                    onBlur={handleBlurPassword}
                  />
                  <span
                    className="icon flex items-center px-4"
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
                    className={`bg-transparent focus:outline-none ${styles.input_text}`}
                    type={`${show.cpassword ? 'text' : 'password'}`}
                    placeholder={'Confirm Password'}
                    {...formik.getFieldProps('cpassword')}
                    onBlur={handleBlurPassword}
                  />
                  <span
                    className="icon flex items-center px-4"
                    onClick={() =>
                      setShow({ ...show, password: !show.password })
                    }
                  >
                    <HiFingerPrint size={28} />
                  </span>
                </div>
                <button
                  className="bg-zinc-800 text-white rounded-full py-2 px-8 mt-5 text-lg w-3/5 hover:scale-105 transition-transform"
                  type="submit"
                >
                  SignIn
                </button>
              </form>
            </div>

            <p className="text-center text-sm text-gray-400">
              {"don't have an account yet?"}
              <Link href={'/logIn'}>
                <a className="text-blue-700"> LogIn</a>
              </Link>
            </p>
          </div>
          <div className="flex justify-center items-center collapse sm:visible">
            <Image
              src={regImage}
              alt="signIn_image"
              height={700}
              width={500}
              quality={30}
              className="reg_image rounded-[2rem]"
            />
          </div>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default SignIn
