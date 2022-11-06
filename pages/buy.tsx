import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import type { NextPage } from 'next'

const BuyPage: NextPage = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center p-10">
        <div className="container">
          <div className="text-center mx-auto mb-[60px] max-w-[510px]">
            <h2 className="font-bold text-[40px] text-blue-600 mb-4">
              Pricing table
            </h2>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
              sint?
            </p>
          </div>
          <div className="flex flex-wrap justify-center">
            <div className="bg-white rounded-xl border border-opacity-20 py-10 px-8 w-1/3 mx-3 mb-5">
              <span className="font-semibold text-lg block mb-4">
                Base package
              </span>
              <h2 className="font-bold mb-5 text-[42px]">
                $150
                <span className="text-base font-medium">/ ARS</span>
              </h2>
              <p className="text-base pb-8 mb-8 border-b border-[#F2F2F2] flex flex-col">
                Perfect for starting at the NFT&apos;s world.
                <div className="flex items-center mt-5">
                  <SvgCoin />
                  <p className="mx-2">1500 coins included.</p>
                </div>
              </p>
              <button className="w-full block text-base font-semibold bg-transparent border border-[#D4DEFF] rounded-md text-center p-4">
                Go to checkout
              </button>
            </div>
            <div className="bg-white rounded-xl border border-opacity-20 py-10 px-8 w-1/3 mx-3 mb-5">
              <span className="font-semibold text-lg block mb-4">
                Advanced package
              </span>
              <h2 className="font-bold mb-5 text-[42px]">
                $500
                <span className="text-base font-medium">/ ARS</span>
              </h2>
              <p className="text-base pb-8 mb-8 border-b border-[#F2F2F2] flex flex-col">
                Perfect for big projects.
                <div className="flex items-center mt-5">
                  <SvgCoin />
                  <p className="mx-2">5000 coins included.</p>
                </div>
              </p>
              <button className="w-full block text-base font-semibold bg-transparent border border-[#D4DEFF] rounded-md text-center p-4">
                Go to checkout
              </button>
            </div>
            <div className="bg-white rounded-xl border border-opacity-20 py-10 px-8 w-1/3 mx-3 mb-5">
              <span className="font-semibold text-lg block mb-4">
                Custom package
              </span>
              <h2 className="font-bold mb-5 text-[42px]">
                $0
                <span className="text-base font-medium">/ ARS</span>
              </h2>
              <p className="text-base pb-8 mb-8 border-b border-[#F2F2F2] flex flex-col">
                Set the quantity of coins that you want for your account!
                <div className="flex items-center mt-5">
                  <SvgCoin />
                  <input
                    type="text"
                    placeholder="Coins"
                    className="mx-2 border rounded-md pl-1 w-20"
                  />
                </div>
              </p>
              <button className="w-full block text-base font-semibold bg-transparent border border-[#D4DEFF] rounded-md text-center p-4">
                Go to checkout
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default BuyPage
