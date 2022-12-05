// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-undef */
import defaultAvatar from '@assets/avataricon.png'
import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import SvgPlus from '@components/icons/svgPlus'
import NavBar from '@components/navbar/navbar'
import getNftsCreated from '@lib/api/users/getNftsCreated'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import type { UserDetailResponse } from 'types/api-responses'

interface Props {
  user: UserDetailResponse
}

const NftsCreated: NextPage<Props> = ({ user }) => {
  const { data: session } = useSession()

  const nfts = user.nftsCreated

  return (
    <div>
      <NavBar />
      <div>
        <div className="h-[350px] bg-slate-900"></div>
        <div className=" h-[185px] w-[185px] absolute top-[225px] left-[60px] rounded-full  border-[8px] border-white ">
          <Image
            width={175}
            height={175}
            className=" bg-white rounded-full object-cover h-[175px] w-[175px]"
            src={session?.user?.image || defaultAvatar}
          />
        </div>
        <div className="mt-[100px] mb-[60px] items-center flex flex-col w-full ">
          <div className=" w-[90%] mb-2  ">
            <h3 className=" text-[2rem] font-[600] ">Nfts Created</h3>
          </div>
          <div className="flex justify-center w-full">
            <div className="flex min-h-[900px] p-8 border-[1px] border-gray-400 rounded-[15px] w-[93%] flex-wrap">
              {nfts.length > 0 &&
                nfts.map((el) => (
                  <div
                    key={el.id}
                    className={` mb-2 w-full lg:w-[30%] lg:mr-6 lg:mb-6 max-w-[287px] h-[380px] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group  dark:bg-stone-900 dark:border-[1px]   dark:border-gray-400  group shadow-lg shadow-zinc-500`}
                  >
                    <Link href={`/nfts/${el.id}`} key={el.id}>
                      <div>
                        <div className="rounded-xl border-spacing-2 ">
                          <Image
                            src={el.image}
                            height={300}
                            width={400}
                            quality={20}
                            alt={`image-${el.name}`}
                            className="rounded-t-xl object-cover group-hover:scale-110 transition duration-300 ease-in-out overflow-auto"
                          />
                        </div>
                        <div className="flex flex-col p-4 w-full justify-between ">
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-row w-full justify-between">
                              <h5
                                className={`text-xl text-white font-bold truncate ease duration-300`}
                              >
                                {el.name}
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
                                {el.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              <Link href={`/nfts/create`}>
                <div
                  className={`lg:w-[30%] w-full lg:max-w-[287px] lg:min-w-[283px] h-[380px] overflow-hidden relative flex flex-col bg-gray-200  dark:border-[1px] rounded-[15px] p-9 dark:border-gray-400 cursor-pointer justify-center shadow-lg group shadow-zinc-500`}
                >
                  <div
                    className={` group-hover:scale-[1.1] transition-all duration-500 rounded-[20px] shadow-inner shadow-zinc-600 bg-gray-300 w-full h-full flex justify-center items-center flex-col`}
                  >
                    <div
                      className={`group-hover:animate-bounce shadow-inner shadow-zinc-800 rounded-[15px] w-[50%] h-[40%] flex justify-center items-center`}
                    >
                      <SvgPlus className="  fill-gray-500 w-[44px] h-[44px] blur-[0.8px]" />
                    </div>
                    <span className="mt-2 text-gray-600 text-[1rem] font-[500]">
                      Create NFT
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getNftsCreated({ id: params?.id as string })
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

export default NftsCreated
