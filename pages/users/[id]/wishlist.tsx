// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
import defaultAvatar from '@assets/avataricon.png'
import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import NavBar from '@components/navbar/navbar'
import getWishes from '@lib/api/users/getWishes'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import type { UserDetailResponse } from 'types/api-responses'

interface Props {
  user: UserDetailResponse
}

const NftsOwned: NextPage<Props> = ({ user }) => {
  const { data: session } = useSession()

  const nfts = user.wishes

  return (
    <div>
      <NavBar />
      <div>
        <div className="h-[250px] dark:bg-[#1c1d1d]" />
        <div className="absolute top-[150px] left-[60px] rounded-full">
          <Image
            width={175}
            height={175}
            quality={100}
            className="rounded-full object-cover bg-gray-200"
            src={session?.user?.image || defaultAvatar}
          />
        </div>
        <div className="items-center flex flex-col w-full my-14">
          <h3 className=" text-[2rem] font-bold mb-10">
            {session?.user.name} |{' '}
            <span className="text-blue-600 font-bold">Wishlist</span>
          </h3>
          <div className="flex justify-center w-full">
            <div className="flex py-5 px-20 w-full flex-wrap">
              {nfts.length > 0 &&
                nfts
                  .filter((nft) => nft.nft.erased === false)
                  .map((el) => (
                    <div
                      key={el.nft.id}
                      className={`relative flex flex-col bg-white dark:bg-[#303339] rounded-xl overflow-auto p-[1px] cursor-pointer group`}
                    >
                      <Link href={`/nfts/${el.nft.id}`} key={el.nft.id}>
                        <div>
                          <div className="rounded-xl border-spacing-2 ">
                            <Image
                              src={el.nft.image}
                              height={300}
                              width={400}
                              quality={20}
                              alt={`image-${el.nft.name}`}
                              className="rounded-t-xl object-cover group-hover:scale-110 transition duration-300 ease-in-out overflow-auto"
                            />
                          </div>
                          <div className="flex flex-col p-4 w-full justify-between ">
                            <div className="flex flex-col gap-2">
                              <div className="flex flex-row w-full justify-between">
                                <h5
                                  className={`text-xl text-white font-bold truncate ease duration-300`}
                                >
                                  {el.nft.name}
                                </h5>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between items-center mb-6">
                              <div className="flex flex-row justify-center items-center gap-2">
                                <span>
                                  <SvgCoin
                                    height={20}
                                    width={20}
                                    className={'fill-white'}
                                  />
                                </span>
                                <span className="text-white font-semibold text-xl">
                                  {el.nft.price}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getWishes({ id: params?.id as string })
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: data,
    },
  }
}

export default NftsOwned
