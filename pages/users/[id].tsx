/* eslint-disable @next/next/no-img-element */
import defaultAvatar from '@assets/avataricon.png'
import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import NavBar from '@components/navbar/navbar'
import getUserById from '@lib/api/users/getUserById'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import type { UserDetailResponse } from 'types/api-responses'
interface Props {
  user: UserDetailResponse
}

const UserDetail: NextPage<Props> = ({ user }) => {
  const { data: session } = useSession()
  const account = session?.user

  return (
    <div>
      <NavBar />
      <div>
        <div className="h-[350px] bg-red-900"></div>
        <div className=" h-[185px] w-[185px] absolute top-[225px] left-[60px] rounded-full  border-[8px] border-gray-100 ">
          <Image
            src={user.image ? `${user.image}` : defaultAvatar}
            height={185}
            width={185}
            alt="user_image"
            className="bg-gray-100 h-full w-full rounded-full"
          />
        </div>
        <div className="mt-[60px] px-[50px]">
          <h2 className=" text-[1.8rem] font-[700]">{user.name}</h2>
          <div>
            <span className="italic text-[1rem] text-gray-600">
              {' '}
              {user.email}{' '}
            </span>
            {user.emailVerified !== null && <span>verified</span>}
          </div>
        </div>
      </div>
      <div className="px-[50px] mt-[20px] flex flex-wrap ">
        <div className=" border-[1px] border-gray-400 w-[48%] min-h-[455px] rounded-[15px] px-[20px] mr-10 mb-4">
          <h3 className="text-[1.5rem] font-[600] text-gray-900 mt-2">Owned</h3>
          <div className="flex w-full justify-between my-3">
            {user.nftsOwned.length > 0 ? (
              user.nftsOwned.map((el) => (
                <div
                  key={el.id}
                  className={`w-[30%] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group`}
                >
                  <Link href={`/nfts/${el.id}`} key={el.id}>
                    {/* // h-[35rem] w-[22rem] */}
                    <div>
                      <div className="rounded-xl border-spacing-2">
                        <Image
                          src={el.image}
                          height={350}
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
                              className={`text-xl text-gray-900 dark:text-white font-bold truncate ease duration-300`}
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
              ))
            ) : (
              <div className="h-[330px]">
                <p>There are no nfts owned yet</p>
              </div>
            )}
          </div>

          {user.nftsOwned.length > 0 && (
            <button className=" bg-blue-500 text-white h-[36px] w-full hover:scale-[1.015] transition-all rounded-[8px] mb-2 ">
              View More
            </button>
          )}
        </div>
        <div className=" border-[1px] border-gray-400 w-[48%] min-h-[455px] rounded-[15px] px-[20px]  mb-4">
          <h3 className="text-[1.5rem] font-[600] text-gray-900 mt-2">
            Created
          </h3>
          <div className="flex w-full justify-between my-3">
            {user.nftsCreated.length > 0 ? (
              user.nftsCreated.map((el) => (
                <div
                  key={el.id}
                  className={`w-[30%] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group`}
                >
                  <Link href={`/nfts/${el.id}`} key={el.id}>
                    {/* // h-[35rem] w-[22rem] */}
                    <div>
                      <div className="rounded-xl border-spacing-2">
                        <Image
                          src={el.image}
                          height={350}
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
                              className={`text-xl text-gray-900 dark:text-white font-bold truncate ease duration-300`}
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
              ))
            ) : (
              <div className="h-[330px]">
                <p>There are no nfts created yet</p>
              </div>
            )}
          </div>

          {user.nftsCreated.length > 0 && (
            <button className=" bg-blue-500 text-white h-[36px] w-full hover:scale-[1.015] transition-all rounded-[8px] mb-2 ">
              View More
            </button>
          )}
        </div>
      </div>
      <div className="px-[50px] mt-[20px] flex flex-wrap ">
        <div className=" mr-10 border-[1px] border-gray-400 w-[48%] min-h-[455px] rounded-[15px] px-[20px]  mb-4">
          <h3 className="text-[1.5rem] font-[600] text-gray-900 mt-2">
            Collections Owned
          </h3>
          <div className="flex w-full justify-between my-3">
            {user.collectionsOwned.length > 0 ? (
              user.collectionsOwned.map((el) => (
                <div
                  key={el.id}
                  className={`w-[30%] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group`}
                >
                  <Link href={`/nfts/${el.id}`} key={el.id}>
                    {/* // h-[35rem] w-[22rem] */}
                    <div>
                      <div className="rounded-xl border-spacing-2">
                        <Image
                          src={el.image}
                          height={350}
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
                              className={`text-xl text-gray-900 dark:text-white font-bold truncate ease duration-300`}
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="h-[330px]">
                <p>There are no collections owned yet</p>
              </div>
            )}
          </div>

          {user.collectionsOwned.length > 0 && (
            <button className=" bg-blue-500 text-white h-[36px] w-full hover:scale-[1.015] transition-all rounded-[8px] mb-2 ">
              View More
            </button>
          )}
        </div>
        <div className=" border-[1px] border-gray-400 w-[48%] min-h-[455px] rounded-[15px] px-[20px]  mb-4">
          <h3 className="text-[1.5rem] font-[600] text-gray-900 mt-2">
            Collections Created
          </h3>
          <div className="flex w-full justify-between my-3">
            {user.collectionsCreated.length > 0 ? (
              user.collectionsCreated.map((el) => (
                <div
                  key={el.id}
                  className={`w-[30%] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group`}
                >
                  <Link href={`/nfts/${el.id}`} key={el.id}>
                    {/* // h-[35rem] w-[22rem] */}
                    <div>
                      <div className="rounded-xl border-spacing-2">
                        <Image
                          src={el.image}
                          height={350}
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
                              className={`text-xl text-gray-900 dark:text-white font-bold truncate ease duration-300`}
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="h-[330px]">
                <p>There are no collections created yet</p>
              </div>
            )}
          </div>

          {user.collectionsCreated.length > 0 && (
            <button className=" bg-blue-500 text-white h-[36px] w-full hover:scale-[1.015] transition-all rounded-[8px] mb-2 ">
              View More
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getUserById({ id: params?.id as string })
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

export default UserDetail
