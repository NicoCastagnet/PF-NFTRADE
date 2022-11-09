/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Footer from '@components/footer'
import SvgCoin from '@components/icons/svgCoin'
import SvgPencil from '@components/icons/svgPencil'
import NavBar from '@components/navbar/navbar'
import BlurImage from '@components/ui/blurImage'
import getUserById from '@lib/api/users/getUserById'
import supabase from '@lib/supa'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import type { UserDetailResponse } from 'types/api-responses'
import defaultAvatar from '/assets/avataricon.png'
import imagePlaceholder from '/assets/image-placeholder.png'
interface Props {
  user: UserDetailResponse
}

const UserDetail: NextPage<Props> = ({ user }) => {
  const { data: session } = useSession()
  const account = session?.user

  const [uploadError, setUploadError] = useState(false)

  interface UserDetails {
    profilePicture: string | null | undefined
    name: string | null | undefined
    email: string
    // password: string | null
  }

  const [userDetails, setUserDetails] = useState<UserDetails>({
    profilePicture: user.image,
    name: user.name,
    email: user.email,
    // password: user.passwordHash,
  })

  useEffect(() => {
    setUserDetails({
      profilePicture: user.image,
      name: user.name,
      email: user.email,
    })
  }, [user.email, user.image, user.name])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const inputName = e.target.name
    const inputValue = e.target.value

    setUserDetails({ ...userDetails, [inputName]: inputValue })
  }

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploadError(false)
    let file
    if (e.target.files) {
      file = e.target.files[0]
    }

    const { data, error } = await supabase.storage
      .from('nfts')
      .upload(
        `public/${Date.now().toString().slice(0, 6)}-${file?.name}`,
        file as File,
      )

    const BUCKET_UPLOAD = process.env.NEXT_PUBLIC_BUCKET_UPLOAD as string
    if (!error) {
      setUserDetails({
        ...userDetails,
        profilePicture: `${BUCKET_UPLOAD}/${data.path}`,
      })
      setSaved(false)
    } else {
      setUploadError(true)
    }
  }

  const [selectPhoto, setSelectPhoto] = useState(false)
  const [changeName, setChangeName] = useState(false)
  const [changeEmail, setChangeEmail] = useState(false)
  const [saved, setSaved] = useState(false)
  // const [changePassword, setChangePassword] = useState(false)

  async function saveChanges() {
    await fetch('/api/user/putUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        name: userDetails.name,
        email: userDetails.email,
        image: userDetails.profilePicture,
      }),
    })
    setSaved(true)
  }

  // const passwordhash = hash(password, 5)

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
            src={userDetails.profilePicture || defaultAvatar}
          />
        </div>
        {account?.id === user.id && (
          <div
            className=" h-[45px] w-[45px] absolute hover:fill-slate-400 hover:scale-[1.1] top-[300px] left-[250px] fill-slate-200 cursor-pointer "
            onClick={() => setSelectPhoto(true)}
          >
            <SvgPencil />
          </div>
        )}

        {selectPhoto === true && (
          <div className=" drop-shadow-lg rounded-[15px] bg-slate-100 w-[90%] h-[80%] fixed left-[5%] top-[10vh] z-[1] flex justify-evenly items-center ">
            <button
              onClick={() => setSelectPhoto(false)}
              className=" absolute top-[20px] right-[20px] rounded-full flex justify-center items-center w-[60px] h-[60px] text-[1.4rem] font-[600] bg-gray-200 border-gray-600 border-[1px] drop-shadow-lg hover:scale-[1.05] transition-all "
            >
              X
            </button>
            <div className="flex lg:py-6 flex-col mb-6 p-3 w-[80%] h-[58vh] items-center justify-center border-[1px] border-gray-300 bg-slate-50 rounded-[15px] lg:h-[50vh] lg:max-w-[420px] lg:min-h-[500px]">
              <div className="relative h-[300px] w-[300px]">
                <BlurImage
                  className="rounded-full"
                  src={userDetails.profilePicture || imagePlaceholder}
                />
              </div>
              <span className="self-start text-red-400">
                {uploadError && 'Fail to load file. Try again.'}
              </span>
              <hr className="w-[82%] h-[2px] bg-slate-300 mb-2 mt-1 lg:w-[90%] lg:mb-4 lg:mt-3 lg:max-w-[316px]" />
              <div className="h-[11vh] w-[80%] lg:h-[7vh] lg:w-[90%] lg:max-w-[316px]">
                <label
                  htmlFor="fileInput"
                  className=" hover:scale-[1.1] transition-all cursor-pointer bg-black text-gray-200 h-[100%] flex items-center justify-center rounded-[15px] lg:h-[70px]"
                >
                  <span className="text-[1.2rem]">Select Image</span>
                </label>
                <input
                  className=" invisible w-[0]"
                  id="fileInput"
                  type="file"
                  name="image"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={(e) => {
                    handleUpload(e)
                  }}
                />
              </div>
            </div>
            <div className="h-[65%] flex flex-col justify-between  ">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-[1rem] font-medium text-gray-900"
                >
                  Name
                </label>
                {changeName === false ? (
                  <div className="flex items-center" id="name">
                    <span className="bg-gray-50 border border-gray-300 text-gray-600 cursor-default text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40vh] p-2.5 ">
                      {userDetails.name}
                    </span>
                    <div
                      className=" h-[35px] ml-2 w-[35px] fill-slate-600 cursor-pointer hover:fill-slate-500 "
                      onClick={() => setChangeName(true)}
                    >
                      <SvgPencil />
                    </div>
                  </div>
                ) : (
                  <div>
                    {userDetails.name?.length < 3 ? (
                      <span className=" text-red-600 ">
                        Name must have at least 3 letters
                      </span>
                    ) : (
                      userDetails.name?.split(' ').length > 1 && (
                        <span className=" text-red-600 ">
                          Name cannot have blanks spaces{' '}
                        </span>
                      )
                    )}
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40vh] p-2.5 "
                      placeholder={userDetails.name}
                      value={userDetails.name}
                      name={'name'}
                      onChange={(e) => handleChange(e)}
                    />
                    <div className="mt-2">
                      <button
                        onClick={() => {
                          setChangeName(false)
                          setSaved(false)
                        }}
                        disabled={
                          userDetails.name?.length < 3 ||
                          userDetails.name?.split(' ').length > 1
                        }
                        className=" bg-blue-500 mr-2 h-[40px] w-[90px] rounded-[10px] drop-shadow-lg hover:scale-[1.05] transition-all disabled:bg-gray-500 disabled:transform-none disabled:transition-none disabled:text-white disabled:cursor-not-allowed"
                      >
                        Ok
                      </button>
                      <button
                        onClick={() => {
                          setChangeName(false)
                          setUserDetails({ ...userDetails, name: user.name })
                        }}
                        className=" bg-red-500 h-[40px] w-[90px] rounded-[10px] drop-shadow-lg hover:scale-[1.05] transition-all "
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-[1rem] font-medium text-gray-900"
                >
                  Email
                </label>
                {changeEmail === false ? (
                  <div className="flex items-center" id="email">
                    <span className="bg-gray-50 border border-gray-300 text-gray-600 cursor-default text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40vh] p-2.5 ">
                      {userDetails.email}
                    </span>
                    <div
                      className=" h-[35px] ml-2 w-[35px] fill-slate-600 cursor-pointer hover:fill-slate-500 "
                      onClick={() => setChangeEmail(true)}
                    >
                      <SvgPencil />
                    </div>
                  </div>
                ) : (
                  <div>
                    {/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(userDetails.email) ===
                    false ? (
                      <span className=" text-red-600 ">
                        It must be a email adress
                      </span>
                    ) : (
                      userDetails.email?.split(' ').length > 1 && (
                        <span className=" text-red-600 ">
                          Email cannot have blanks spaces{' '}
                        </span>
                      )
                    )}
                    <input
                      type="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40vh] p-2.5 "
                      placeholder={userDetails.email}
                      value={userDetails.email}
                      name={'email'}
                      onChange={(e) => handleChange(e)}
                    />
                    <div className="mt-2">
                      <button
                        onClick={() => {
                          setChangeEmail(false)
                          setSaved(false)
                        }}
                        disabled={
                          /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(
                            userDetails.email,
                          ) === false ||
                          userDetails.email?.split(' ').length > 1
                        }
                        className=" bg-blue-500 mr-2 h-[40px] w-[90px] rounded-[10px] drop-shadow-lg hover:scale-[1.05] transition-all disabled:bg-gray-500 disabled:transform-none disabled:transition-none disabled:text-white disabled:cursor-not-allowed"
                      >
                        Ok
                      </button>
                      <button
                        onClick={() => {
                          setChangeEmail(false)
                          setUserDetails({ ...userDetails, email: user.email })
                        }}
                        className=" bg-red-500 h-[40px] w-[90px] rounded-[10px] drop-shadow-lg hover:scale-[1.05] transition-all "
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    saveChanges()
                  }}
                  disabled={
                    userDetails.name === user.name &&
                    userDetails.email === user.email &&
                    userDetails.profilePicture === user.image
                  }
                  className=" bg-blue-500 mr-10 h-[50px] w-[160px] rounded-[10px] drop-shadow-lg hover:scale-[1.05] transition-all disabled:bg-gray-500 disabled:transform-none disabled:transition-none disabled:text-white disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-[60px] px-[50px]">
          <h2 className=" text-[1.8rem] font-[700]">{userDetails.name}</h2>
          <div>
            <span className="italic text-[1rem] text-gray-600">
              {' '}
              {userDetails.email}{' '}
            </span>
            {user.emailVerified !== null && <span>verified</span>}
          </div>
        </div>
      </div>
      <div className="px-[50px] mt-[20px] flex flex-wrap ">
        <div className=" border-[1px] border-gray-400 w-[48%]  rounded-[15px] px-[20px]  mr-8 mb-4">
          <h3 className="text-[1.5rem] font-[600] text-gray-900 mt-2">Owned</h3>
          <div
            className={`flex w-full ${
              user.nftsOwned.length !== 2 && user.nftsOwned.length !== 5
                ? 'justify-between'
                : 'justify-evenly'
            } justify-between h-[700px] my-3 flex-wrap `}
          >
            {user.nftsOwned.length > 0 ? (
              user.nftsOwned.map((el) => (
                <div
                  key={el.id}
                  className={`w-[30%] max-w-[277px] h-[300px] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group`}
                >
                  <Link href={`/nfts/${el.id}`} key={el.id}>
                    {/* // h-[35rem] w-[22rem] */}
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
          <div
            className={`flex w-full ${
              user.nftsCreated.length > 2 ? 'justify-between' : 'justify-evenly'
            } justify-between h-[700px] my-3 flex-wrap `}
          >
            {user.nftsCreated.length > 0 ? (
              user.nftsCreated.map((el) => (
                <div
                  key={el.id}
                  className={`w-[30%] max-w-[277px] h-[300px] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group`}
                >
                  <Link href={`/nfts/${el.id}`} key={el.id}>
                    {/* // h-[35rem] w-[22rem] */}
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
          <div className="flex w-full justify-evenly my-3 items-center h-full">
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
                          src={el.image || ''}
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
          <div className="flex w-full justify-evenly my-3 items-center h-full">
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
                          src={el.image || ''}
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
