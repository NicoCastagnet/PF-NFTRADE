import { useFormik } from 'formik'
import { login_valid } from 'hook/validate'
import type { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import whiteLogo from '../Assets/logo@1,25x.png'
import regImage from '../Assets/nft-cost.jpg'
import useInfoProviders from '../hook/providers'
import SvgFacebook from '../svg/svgFacebook'
import SvgGoogle from '../svg/svgGoogle'
import SvgLinkedIn from '../svg/svgLinkedIn'
import SvgTwitter from '../svg/svgTwitter'

//
//
const LogIn: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { providers } = useInfoProviders()
  ////////////////////////////////////////////////
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: login_valid,
    onSubmit,
  })
  console.log(formik.errors)

  async function onSubmit(values: { email: string; password: string }) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: '/',
    })

    console.log(status)
  }

  ///////////////////////////////////////////////////////////////
  if (status === 'loading') {
    return <h1>Loading...</h1>
  }
  if (session) {
    router.push('/')
  }

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen">
      <Head>
        <title>LogIn</title>
      </Head>
      <div className="flex flex-row items-start pl-6 w-full">
        <Image src={whiteLogo} alt="white_logo" height={80} width={150} />
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center w-full">
        <div className="flex flex-col items-center justify-center w-full max-w-md mt-4">
          <div className="flex flex-col items-center w-full">
            <h1 className="reg-title text-3xl font-normal">Log In</h1>
            <h3 className="reg-subtitle text-xl text-left text-gray-500">
              {"Let's get started!"}
            </h3>
            <form
              className="flex flex-col items-center gap-5 w-full"
              onSubmit={formik.handleSubmit}
            >
              <input
                className="bg-transparent border-b-2 border-b-gray-500 p-2 m-2 text-xl font-light"
                type="email"
                placeholder={'Email'}
                // name='email'
                // onChange={formik.handleChange}
                // value={formik.values.email}
                {...formik.getFieldProps('email')}
              />
              <input
                className="bg-transparent border-b-2 border-b-gray-500 p-2 m-2 text-xl font-light"
                type="text"
                placeholder={'Password'}
                // name={'password'}
                // onChange={formik.handleChange}
                // value={formik.values.password}
                {...formik.getFieldProps('password')}
              />
              <button
                className="bg-zinc-800 text-white rounded-full py-2 px-8 mt-10 mb-5 text-lg w-3/5"
                type="submit"
              >
                LogIn
              </button>
            </form>
          </div>
          <div className="flex flex-row justify-evenly items-center w-3/5">
            {providers?.google && (
              <button
                onClick={async () => {
                  await signIn(providers.google.id)
                }}
              >
                <SvgGoogle />
              </button>
            )}
            {providers?.facebook && (
              <button
                onClick={async () => {
                  await signIn(providers.facebook.id)
                }}
              >
                <SvgFacebook />
              </button>
            )}

            {providers?.twitter && (
              <button
                onClick={async () => {
                  await signIn(providers.twitter.id)
                }}
              >
                <SvgTwitter />
              </button>
            )}

            {providers?.linkedin && (
              <button
                onClick={async () => {
                  await signIn(providers.linkedin.id)
                }}
              >
                <SvgLinkedIn />
              </button>
            )}
          </div>
          <p className="text-center text-gray-400">
            {"don't have an account yet?"}
            <Link href={'/register'}>
              <a className="text-blue-700"> Sign Up</a>
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
  )
}

export default LogIn
