import grid from '@assets/grid2.png'
import Footer from '@components/footer'
import NavBar from '@components/navbar'
import type { NextPage } from 'next'
import Image from 'next/image'

const HomePage: NextPage = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-[0.8rem]">
          BUY, SELL & DISCOVER RARE DIGITAL ITEMS
        </h2>
        <h1 className="text-2xl font-bold m-4">
          The 1st and the best NFT marketplace
        </h1>
        <div className="home__carousel flex flex-row justify-around bg-slate-800 h-auto w-full p-10">
          <Image src={grid} alt="white_logo" />
          <Image src={grid} alt="white_logo" />
          <div className="flex flex-col">
            <div>SOME COLLECTION</div>
            <div>SOME COLLECTION PRICE</div>
            <div>SOME COLLECTION OWNER</div>
            <div>SOME COLLECTION INFO</div>
          </div>
        </div>
        <div className="home__top text-left">
          <p className="text-2xl font-bold mt-5">Top sellers this month</p>
          <div className="home__top-boxes flex">
            <div className="top-3 flex items-center bg-slate-800 h-44 w-96 rounded-xl p-10 m-5 text-white">
              <ul>
                <li className="flex items-center m-2">
                  <Image
                    src={grid}
                    alt="white_logo"
                    height={35}
                    width={35}
                    className="rounded-full m-15"
                  />
                  01. User NRO 1
                </li>
                <li className="flex items-center m-2">
                  <Image
                    src={grid}
                    alt="white_logo"
                    height={35}
                    width={35}
                    className="rounded-full"
                  />
                  02. User NRO 2
                </li>
                <li className="flex items-center m-2">
                  <Image
                    src={grid}
                    alt="white_logo"
                    height={35}
                    width={35}
                    className="rounded-full"
                  />
                  03. User NRO 3
                </li>
              </ul>
            </div>
            <div className="top-9 flex items-center bg-slate-800 h-44 w-[54rem] rounded-xl p-10 m-5 text-white">
              <ul className="flex flex-wrap">
                <li className="flex items-center m-2">
                  <Image
                    src={grid}
                    alt="white_logo"
                    height={35}
                    width={35}
                    className="rounded-full m-15"
                  />
                  04. User NRO 4
                </li>
                <li className="flex items-center m-2">
                  <Image
                    src={grid}
                    alt="white_logo"
                    height={35}
                    width={35}
                    className="rounded-full"
                  />
                  05. User NRO 5
                </li>
                <li className="flex items-center m-2">
                  <Image
                    src={grid}
                    alt="white_logo"
                    height={35}
                    width={35}
                    className="rounded-full"
                  />
                  06. User NRO 6
                </li>
                <li className="flex items-center m-2">
                  <Image
                    src={grid}
                    alt="white_logo"
                    height={35}
                    width={35}
                    className="rounded-full m-15"
                  />
                  07. User NRO 7
                </li>
                <li className="flex items-center m-2">
                  <Image
                    src={grid}
                    alt="white_logo"
                    height={35}
                    width={35}
                    className="rounded-full"
                  />
                  08. User NRO 8
                </li>
                <li className="flex items-center m-2">
                  <Image
                    src={grid}
                    alt="white_logo"
                    height={35}
                    width={35}
                    className="rounded-full"
                  />
                  09. User NRO 9
                </li>
                <li className="flex items-center m-2">
                  <Image
                    src={grid}
                    alt="white_logo"
                    height={35}
                    width={35}
                    className="rounded-full m-15"
                  />
                  10. User NRO 10
                </li>
                <li className="flex items-center m-2">
                  <Image
                    src={grid}
                    alt="white_logo"
                    height={35}
                    width={35}
                    className="rounded-full"
                  />
                  11. User NRO 11
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="home__top text-left">
          <p className="text-2xl font-bold mt-5">Popular collections</p>
          <div className="home__top-boxes flex">
            <div className="top-3 flex items-center bg-slate-800 h-auto w-auto rounded-xl p-10 m-5 text-white">
              <ul>
                <li className="flex flex-col items-center">
                  <Image src={grid} alt="white_logo" height={150} width={150} />
                  Collection name
                </li>
              </ul>
            </div>
            <div className="top-3 flex items-center bg-slate-800 h-auto w-auto rounded-xl p-10 m-5 text-white">
              <ul>
                <li className="flex flex-col items-center">
                  <Image src={grid} alt="white_logo" height={150} width={150} />
                  Collection name
                </li>
              </ul>
            </div>
            <div className="top-3 flex items-center bg-slate-800 h-auto w-auto rounded-xl p-10 m-5 text-white">
              <ul>
                <li className="flex flex-col items-center">
                  <Image src={grid} alt="white_logo" height={150} width={150} />
                  Collection name
                </li>
              </ul>
            </div>
            <div className="top-3 flex items-center bg-slate-800 h-auto w-auto rounded-xl p-10 m-5 text-white">
              <ul>
                <li className="flex flex-col items-center">
                  <Image src={grid} alt="white_logo" height={150} width={150} />
                  Collection name
                </li>
              </ul>
            </div>
            <div className="top-3 flex items-center bg-slate-800 h-auto w-auto rounded-xl p-10 m-5 text-white">
              <ul>
                <li className="flex flex-col items-center">
                  <Image src={grid} alt="white_logo" height={150} width={150} />
                  Collection name
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HomePage
