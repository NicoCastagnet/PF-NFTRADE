// import whiteLogo from '../Assets/logo@1,25x.png';
import { useFormik } from 'formik'
import { registerValidate } from 'hook/validate'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import whiteLogo from '../Assets/logo@1,25x.png'
import regImage from '../Assets/nft-cost.jpg'

const Register: NextPage = () => {
  //////////////////////////////////////////////////
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
    console.log('register => ', values)
  }

  ////////////////////////////////////////////////////////////////
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>

      <div className="flex flex-col items-center justify-start w-full min-h-screen">
        <div className="flex flex-row items-start pl-6 w-full">
          <Image src={whiteLogo} alt="white_logo" height={80} width={150} />
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center w-full">
          <div className="flex flex-col items-center justify-center w-full max-w-md mt-4">
            <div className="flex flex-col items-center w-full">
              <h1 className="reg-title text-3xl font-normal">Register</h1>
              <h3 className="reg-subtitle text-xl text-left text-gray-500">
                {"Let's get started!"}
              </h3>
              <form
                className="flex flex-col items-center gap-5 w-full"
                onSubmit={formik.handleSubmit}
              >
                <input
                  className="bg-transparent border-b-2 border-b-gray-500 p-2 m-2 text-xl font-light"
                  type="text"
                  placeholder={'UserName'}
                  {...formik.getFieldProps('username')}
                />
                <input
                  className="bg-transparent border-b-2 border-b-gray-500 p-2 m-2 text-xl font-light"
                  type="email"
                  placeholder={'Email'}
                  {...formik.getFieldProps('email')}
                />
                <input
                  className="bg-transparent border-b-2 border-b-gray-500 p-2 m-2 text-xl font-light"
                  type="text"
                  placeholder={'Password'}
                  {...formik.getFieldProps('password')}
                />
                <input
                  className="bg-transparent border-b-2 border-b-gray-500 p-2 m-2 text-xl font-light"
                  type={'text'}
                  placeholder={'Confirm Password'}
                  {...formik.getFieldProps('cpassword')}
                />
                <button
                  className="bg-zinc-800 text-white rounded-full py-2 px-8 mt-10 mb-5 text-lg w-3/5"
                  type="submit"
                  // onClick={signInUser}
                >
                  LogIn
                </button>
              </form>
            </div>

            <p className="text-center text-gray-400">
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
    </>
  )
}

export default Register
