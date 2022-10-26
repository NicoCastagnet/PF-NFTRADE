import whiteLogo from '@assets/White.png'
import SvgBitCoin from '@components/icons/svgBitCoin'
import SvgCart from '@components/icons/svgCart'
import SvgSearch from '@components/icons/svgSearch'
import SvgUser from '@components/icons/svgUser'
import Image from 'next/image'

export default function NavBar() {
  return (
    <nav className="navbar__nav bg-slate-900 w-full flex flex-row text-center items-center p-2 pl-8 pr-8 justify-between fixed">
      <div className="navbar__izq flex flex-row items-center">
        <Image src={whiteLogo} alt="white_logo" height={80} width={150} />
        <div className="navbar__searchbar">
          <input
            className="w-96 h-11 rounded-md ml-10 p-3 pl-12 text-white hover:bg-slate-700 ease duration-150 focus: outline-none focus:bg-slate-700"
            type="text"
            placeholder="Search articles, colections & accounts"
          />
          <SvgSearch
            width={'20'}
            height={'20'}
            className="absolute left-[14.5rem] top-[2.09rem] fill-slate-400 m-1"
          />
        </div>
      </div>
      <div className="navbar__buttons flex flex-row items-center text-white">
        <button className="m-3">Explore</button>
        <button className="m-3">Marketplace</button>
        <div className="flex m-3">
          <SvgBitCoin width={'25'} height={'25'} />
          <p className="">0 coins</p>
        </div>
        <button>
          <SvgUser className="m-3" width={'25'} height={'25'} />
        </button>
        <button>
          <SvgCart className="m-3" width={'25'} height={'25'} />
        </button>
      </div>
    </nav>
  )
}
