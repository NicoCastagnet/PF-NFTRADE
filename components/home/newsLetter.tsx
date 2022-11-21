// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import Newsletter from '@assets/newsletter.png'
import SvgMail from '@components/icons/svgMail'
import axios from 'axios'
import Image from 'next/image'
import { useState } from 'react'
// import mailSendNews from '../../pages/api/emails/newsLetter'

const NewsLetter = () => {
  const [mail, setmail] = useState('')

  const handleOnChange = (e: any) => {
    setmail(e.target.value)
  }

  const handleSubmit = async () => {
    await axios.get(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/emails/newsLetter?email=${mail}`,
    )
    setmail('')
  }

  return (
    <section className="home__newsletter flex items-center justify-center w-full ">
      <div className="flex flex-row justify-center items-center max-w-7xl m-14 max-lg:max-w-2xl max-sm:m-8">
        <div className="home__newsletter-left">
          <p className="left-title text-5xl font-bold tracking-wide w-4/5 max-md:text-2xl ">
            Subscribe to receive all the{' '}
            <span className="font-extrabold text-blue-600 uppercase">news</span>{' '}
            and{' '}
            <span className="font-extrabold text-blue-600 uppercase">
              offers
            </span>{' '}
            daily!
          </p>
          <p className="mt-10 mb-10 w-4/5 max-md:text-sm max-md:my-4 text-gray-600 dark:text-gray-400">
            Find out about all the news, promotions, discounts, events and much
            more subscribing to our news letter. It is easy, just leave us your
            email and we will take care of the rest!
          </p>
          <form className=" max-md:w-full">
            <div className="relative  max-md:w-full">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <SvgMail />
              </div>
              <input
                type="search"
                id="default-search"
                className="block focus:outline-none bg-gray-100 dark:bg-[#303339] dark:border-none p-4 pl-10 pr-28 w-4/5 text-sm rounded-lg border max-md:w-full max-md:pr-[5.5rem]"
                placeholder="Enter your e-mail"
                required
                onChange={(e) => handleOnChange(e)}
              />
              <button
                onClick={() => handleSubmit()}
                type="submit"
                className="text-white absolute right-[21%] bottom-[8.5px] bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 max-md:right-[3%] transition-all"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
        <div className="home__newsletter-right max-xl:hidden bg-blue-500 dark:bg-[#303339] rounded-full ease duration-500">
          <Image src={Newsletter} alt="nft2_img" height={850} width={890} />
        </div>
      </div>
    </section>
  )
}

export default NewsLetter
