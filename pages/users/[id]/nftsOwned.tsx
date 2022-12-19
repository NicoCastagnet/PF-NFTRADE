// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import defaultAvatar from '@assets/avataricon.png'
import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import NavBar from '@components/navbar/navbar'
import getNftsOwned from '@lib/api/users/getNftsOwned'
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

  const nfts = user.nftsOwned

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
            alt={session?.user.name}
          />
        </div>
        <div className="mt-[100px] mb-[60px] items-center flex flex-col w-full ">
          <div className=" w-[90%] mb-2  ">
            <h3 className=" text-[2rem] font-[600] ">Nfts Owned</h3>
          </div>
          <div className="flex justify-center w-full">
            <div className="flex min-h-[900px] p-8 border-[1px] border-gray-400 rounded-[15px] w-[93%] flex-wrap">
              {nfts.length > 0 &&
                nfts.map((el) => (
                  <div
                    key={el.id}
                    className={` w-full lg:w-[30%] lg:mr-6 mb-2 lg:mb-6 max-w-[287px] h-[380px] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group  dark:bg-stone-900 dark:border-[1px]   dark:border-gray-400  group shadow-lg shadow-zinc-500`}
                  >
                    <Link href={`/nfts/${el.id}`} key={el.id}>
                      <a>
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
                      </a>
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
  const data = await getNftsOwned({ id: params?.id as string })
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
