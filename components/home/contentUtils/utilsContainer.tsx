import Buy from '@components/home/contentUtils/buy'
import Create from '@components/home/contentUtils/create'
import List from '@components/home/contentUtils/list'
import SvgChevronDown from '@components/icons/svgChevronDown'
import { useState } from 'react'

const UtilsContainer = () => {
  const [selected, setSelected] = useState(0)

  const previous = () => {
    if (selected === 0) return
    if (selected >= 1) setSelected((state) => state - 1)
  }

  const next = () => {
    if (selected === 2) return
    if (selected <= 1) setSelected((state) => state + 1)
  }

  return (
    <section className="home__utils flex flex-col items-center w-full m-14">
      <p className="text-5xl max-md:text-4xl max-sm:text-2xl font-bold max-sm:pb-7 tracking-wide ease duration-500">
        Create, buy & sell your{' '}
        <span className="text-blue-600 font-extrabold">NFT&apos;s</span>
      </p>
      <div className="relative mt-14 max-md:m-0 h-96 flex justify-center items-center w-full max-w-7xl bg-slate-900 max-md:rounded-none max-lg:max-w-2xl rounded-2xl ease duration-500">
        <div className="lg:hidden flex flex-row justify-center items-center gap-8 ease duration-500">
          {selected === 0 && <Buy />}
          {selected === 1 && <Create />}
          {selected === 2 && <List />}
        </div>

        <div className="max-lg:hidden flex flex-row justify-center items-center gap-8 ease duration-500">
          <Buy />
          <Create />
          <List />
        </div>

        <button className="absolute -left-0 lg:hidden" onClick={previous}>
          <SvgChevronDown
            className="rotate-90 fill-white"
            heigth="40"
            width="40"
          />
        </button>

        <button className="absolute -right-0 lg:hidden" onClick={next}>
          <SvgChevronDown
            className="-rotate-90 fill-white"
            heigth="40"
            width="40"
          />
        </button>
      </div>
    </section>
  )
}

export default UtilsContainer
// /home/lucas/Documentos/Henry/PF-extras/PF-NFTRADE/assets/nft-img.png
