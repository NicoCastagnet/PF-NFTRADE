import type { NextPage } from 'next'
import Image from 'next/image'
import whiteLogo from '../Assets/logo@1,25x.png'
import regImage from '../Assets/nft-cost.jpg'
import SvgFacebook from '../svg/svgFacebook'
import SvgGoogle from '../svg/svgGoogle'
import SvgLinkedIn from '../svg/svgLinkedIn'
import SvgTwitter from '../svg/svgTwitter'

const signIn: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen">
      <div className="flex flex-row items-start pl-6 w-full">
        <Image src={whiteLogo} alt="white_logo" height={80} width={150} />
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center w-full">
        <div className="flex flex-col items-center justify-center w-full max-w-md mt-4">
          <div className='flex flex-col items-center w-full'>
            <h1 className="reg-title text-3xl font-normal">
              Create an account
            </h1>
            <h3 className="reg-subtitle text-xl text-left text-gray-500">
              Let&aposs get started!
            </h3>
            <form className='flex flex-col items-center w-full'>
            <input
              className="bg-transparent border-b-2 border-b-gray-500 p-2 m-2 text-xl font-light"
              type="email"
              placeholder={'Email'}
            />
            <input
              className="bg-transparent border-b-2 border-b-gray-500 p-2 m-2 text-xl font-light"
              type="password"
              placeholder={'Password'}
            />
            <button
              className="bg-zinc-800 text-white rounded-full py-2 px-8 mt-10 mb-5 text-lg w-3/5"
              type="submit"
            >
              Create account
            </button>
            </form>



          </div>
          <div className="flex flex-row justify-evenly items-center w-3/5">
            <SvgGoogle />
            <SvgFacebook />
            <SvgTwitter />
            <SvgLinkedIn />
          </div>
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

export default signIn
