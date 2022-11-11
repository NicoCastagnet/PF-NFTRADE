import Logonftrade from '@assets/logo_NFTRADE.png'
import whiteLogo from '@assets/White.png'
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <>
      <div className="max-sm:hidden flex justify-center items-center h-full w-72 mr-8">
        <Link href={'/'} shallow>
          <a>
            <Image
              src={whiteLogo}
              alt="white_logo"
              quality={50}
              height={75}
              width={130}
              className="cursor-pointer w-full h-full"
            />
          </a>
        </Link>
      </div>
      <div className="sm:hidden flex justify-center items-center  h-full">
        <Link href={'/'}>
          <a>
            <Image
              src={Logonftrade}
              alt="white_logo"
              quality={50}
              height={70}
              objectFit={'contain'}
              width={70}
              className="cursor-pointer w-full h-full"
            />
          </a>
        </Link>
      </div>
    </>
  )
}

export default Logo
