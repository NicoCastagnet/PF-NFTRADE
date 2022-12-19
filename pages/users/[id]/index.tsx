// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import defaultAvatar from '@assets/avataricon.png'
import imagePlaceholder from '@assets/image-placeholder.png'
import Footer from '@components/footer'
import SvgPencil from '@components/icons/svgPencil'
import SvgPlus from '@components/icons/svgPlus'
import NavBar from '@components/navbar/navbar'
import BlurImage from '@components/ui/blurImage'
import CollectionCard from '@components/user/collectionCard'
import NftCard from '@components/user/nftCard'
import getUserById from '@lib/api/users/getUserById'
import supabase from '@lib/supa'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import type { UserDetailResponse } from 'types/api-responses'

interface Props {
  user: UserDetailResponse
}

const UserDetail: NextPage<Props> = ({ user }) => {
  const { data: session } = useSession()

  const [uploadError, setUploadError] = useState(false)

  interface UserDetails {
    profilePicture: string
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
        `public/${Date.now().toString().slice(0, 6)}-${
          file?.name
        }-${Math.random().toString().slice(0, 6)}`,
        file as File,
      )

    const BUCKET_UPLOAD = process.env.NEXT_PUBLIC_SUPABASE_UPLOAD as string
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

  return (
    <div>
      <NavBar />
      {selectPhoto === true && (
        <div className=" drop-shadow-lg rounded-[15px] bg-slate-100 w-[90%] h-[80%] fixed left-[5%] top-[14vh] z-[1] flex justify-evenly items-center ">
          <button
            onClick={() => setSelectPhoto(false)}
            className=" absolute top-[20px] right-[20px] rounded-full flex justify-center items-center w-[60px] h-[60px] text-[1.4rem] font-[600] bg-gray-200 border-gray-600 border-[1px] drop-shadow-lg hover:scale-[1.05] transition-all z-[1] "
          >
            X
          </button>
          <div className="flex px-3 py-10 w-full lg:w-[90%] h-[90%] overflow-auto items-center justify-between lg:flex-row flex-col">
            <div className="flex lg:py-6 flex-col min-h-[330px] mb-6 p-3 w-[50%] min-w-[264px] h-full items-center justify-center border-[1px] border-gray-300 bg-slate-50 rounded-[15px] lg:h-[50vh] lg:max-w-[420px] lg:min-h-[500px]">
              <div className="relative lg:h-[300px] lg:w-[300px] w-[60%] min-w-[225px] h-[80%]">
                {userDetails.profilePicture ? (
                  <BlurImage
                    className="rounded-full"
                    loader={() => userDetails.profilePicture}
                    src={imagePlaceholder}
                  />
                ) : (
                  <BlurImage
                    className="rounded-full"
                    src={userDetails.profilePicture || imagePlaceholder}
                  />
                )}
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
            <div className="h-[65%] w-full lg:w-auto flex flex-col justify-between  ">
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
                          setUserDetails({
                            ...userDetails,
                            email: user.email,
                          })
                        }}
                        className=" bg-red-500 h-[40px] w-[90px] rounded-[10px] drop-shadow-lg hover:scale-[1.05] transition-all "
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex lg:justify-end justify-center">
                <button
                  onClick={() => {
                    saveChanges()
                  }}
                  disabled={
                    (userDetails.name === user.name &&
                      userDetails.email === user.email &&
                      userDetails.profilePicture === user.image) ||
                    saved === true
                  }
                  className=" bg-blue-500 lg:mr-10 mt-10 lg:mt-0 h-[50px] w-[160px] rounded-[10px] drop-shadow-lg hover:scale-[1.05] transition-all disabled:bg-gray-500 disabled:transform-none disabled:transition-none disabled:text-white disabled:cursor-not-allowed"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className={` ${
          selectPhoto === true && 'blur-[5px] opacity-60'
        } bg-gray-200 dark:bg-[#202225] transition-all`}
      >
        <div>
          <div className="h-[350px] bg-slate-900 dark:bg-[#161616]" />
          {session?.user.id === user.id ? (
            <div
              className=" h-[185px] w-[185px] absolute top-[225px] left-[60px] cursor-pointer"
              onClick={() => setSelectPhoto(true)}
            >
              <Image
                width={175}
                height={175}
                quality={100}
                className=" bg-white rounded-xl object-cover h-[175px] w-[175px]"
                src={userDetails.profilePicture || defaultAvatar}
              />
            </div>
          ) : (
            <div className=" h-[185px] w-[185px] absolute top-[225px] left-[60px] rounded-full">
              <Image
                width={175}
                height={175}
                quality={100}
                className=" bg-white rounded-xl object-cover h-[175px] w-[175px]"
                src={userDetails.profilePicture || defaultAvatar}
              />
            </div>
          )}

          <div className="mt-[60px] px-[50px]">
            <h2 className=" text-[1.8rem] font-[700] dark:text-gray-300">
              {userDetails.name}
            </h2>
            <div>
              <span className="italic text-[1rem] text-gray-400">
                {session?.user.id}
              </span>
              {user.emailVerified !== null && <span>verified</span>}
            </div>
          </div>
        </div>
        <div className="lg:px-[50px] px-[10px] mt-[20px] flex flex-wrap ">
          <div className=" border-[1px] w-full lg:w-[48%] rounded-[15px] px-[20px] mr-10 mb-4 border-gray-100 dark:border-[#303339]">
            <h3 className="text-[1.5rem] font-[600] text-gray-900 mt-2 dark:text-gray-300">
              Owned
            </h3>
            <div
              className={`flex w-full h-[700px] justify-center lg:justify-start my-3 flex-wrap overflow-auto`}
            >
              {user.nftsOwned.length > 0 ? (
                user.nftsOwned.map((el) => <NftCard key={el.id} nft={el} />)
              ) : (
                <div className="h-[330px]">
                  <p>There are no nfts owned yet</p>
                </div>
              )}
            </div>

            <Link href={`${user.id}/nftsOwned`}>
              <a>
                <button
                  disabled={user.nftsOwned.length < 1}
                  className=" bg-blue-500 disabled:cursor-default disabled:bg-gray-500 disabled:hover:scale-[1] text-white h-[36px] w-full hover:scale-[1.015] transition-all rounded-[8px] mb-5 "
                >
                  View More
                </button>
              </a>
            </Link>
          </div>
          <div className=" border-[1px] w-full lg:w-[48%] rounded-[15px] px-[20px] mb-4 border-gray-100 dark:border-[#303339]">
            <h3 className="text-[1.5rem] font-[600] text-gray-900 mt-2 dark:text-gray-300">
              Created
            </h3>
            <div
              className={`flex w-full h-[700px] justify-center lg:justify-start my-3 flex-wrap overflow-auto`}
            >
              {user.nftsCreated.length > 0
                ? user.nftsCreated.map((el) => <NftCard key={el.id} nft={el} />)
                : user.id !== session?.user.id && (
                    <div>
                      <p>There are no nfts created yet</p>
                    </div>
                  )}
              {user.nftsCreated.length < 6 &&
                3 &&
                user.id === session?.user.id && (
                  <Link href={`/nfts/create`}>
                    <div
                      className={`mr-6 mb-6 w-[30%] max-w-[277px] min-w-[194px] h-[300px] overflow-hidden relative flex flex-col bg-gray-200  dark:border-[1px] rounded-[15px] p-9 dark:border-gray-400 cursor-pointer justify-center group shadow-lg shadow-zinc-500`}
                    >
                      <div
                        className={`group-hover:scale-[1.1] transition-all duration-500 rounded-[20px] shadow-inner shadow-zinc-600 bg-gray-300 w-full h-full flex justify-center items-center flex-col`}
                      >
                        <div
                          className={`group-hover:animate-bounce 
                      } shadow-inner shadow-zinc-800 rounded-[15px] w-[50%] h-[40%] flex justify-center items-center`}
                        >
                          <SvgPlus className="  fill-gray-500 w-[44px] h-[44px] blur-[0.8px]" />
                        </div>
                        <span className="mt-2 text-gray-600 text-[1rem] font-[500]">
                          Create NFT
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
            </div>

            <Link href={`${user.id}/nftsCreated`}>
              <button
                disabled={user.nftsCreated.length < 1}
                className=" bg-blue-500 disabled:cursor-default disabled:bg-gray-500 disabled:hover:scale-[1] text-white h-[36px] w-full hover:scale-[1.015] transition-all rounded-[8px] mb-5 "
              >
                View More
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:px-[50px] px-[10px] mt-[20px] flex flex-wrap ">
          <div className=" lg:mr-8 border-[1px]  border-gray-400 w-full lg:w-[48%] h-[455px] rounded-[15px] px-[20px]  mb-4">
            <h3 className="text-[1.5rem] font-[600] text-gray-900 mt-2 dark:text-gray-200">
              Collections Owned
            </h3>
            <div className="flex w-full my-3 h-[330px] justify-center lg:justify-start  flex-wrap overflow-auto">
              {user.collectionsOwned.length > 0 ? (
                user.collectionsOwned.map((el) => (
                  <CollectionCard key={el.id} collection={el} />
                ))
              ) : (
                <div>
                  <p>There are no collections owned yet</p>
                </div>
              )}
            </div>

            <Link href={`${user.id}/nftsOwned`}>
              <button
                disabled={user.collectionsOwned.length < 1}
                className=" bg-blue-500 disabled:cursor-default disabled:bg-gray-500 disabled:hover:scale-[1] text-white h-[36px] w-full hover:scale-[1.015] transition-all rounded-[8px] mb-5 "
              >
                View More
              </button>
            </Link>
          </div>
          <div className=" border-[1px] border-gray-400 w-full lg:w-[48%] h-[455px] rounded-[15px] px-[20px]  mb-4">
            <h3 className="text-[1.5rem] font-[600] text-gray-900 mt-2 dark:text-gray-200">
              Collections Created
            </h3>
            <div className="flex w-full my-3 h-[330px] justify-center lg:justify-start  flex-wrap overflow-auto">
              {user.collectionsOwned.length > 0
                ? user.collectionsOwned.map((el) => (
                    <CollectionCard key={el.id} collection={el} />
                  ))
                : user.id !== session?.user.id && (
                    <div>
                      <p>There are no collections created yet</p>
                    </div>
                  )}
              {user.collectionsCreated.length < 3 &&
                user.id === session?.user.id && (
                  <Link href={`${user.id}/collections/create`}>
                    <div
                      className={` mr-6 mb-6 w-[30%] max-w-[277px] min-w-[194px] h-[300px] overflow-hidden relative flex flex-col bg-gray-200  dark:border-[1px] rounded-[15px] p-9 dark:border-gray-400 cursor-pointer justify-center group shadow-lg shadow-zinc-500`}
                    >
                      <div
                        className={`group-hover:scale-[1.1] transition-all duration-500 rounded-[20px] shadow-inner shadow-zinc-600 bg-gray-300 w-full h-full flex justify-center items-center flex-col`}
                      >
                        <div
                          className={`group-hover:animate-bounce 
                    } shadow-inner shadow-zinc-800 rounded-[15px] w-[50%] h-[40%] flex justify-center items-center`}
                        >
                          <SvgPlus className="  fill-gray-500 w-[44px] h-[44px] blur-[0.8px]" />
                        </div>
                        <span className="mt-2 text-center text-gray-600 text-[1rem] font-[500]">
                          Create Collection
                        </span>
                      </div>
                    </div>
                  </Link>
                )}
            </div>

            <Link href={`${user.id}/collectionsCreated`}>
              <button
                disabled={user.collectionsCreated.length < 1}
                className=" bg-blue-500 disabled:cursor-default disabled:bg-gray-500 disabled:hover:scale-[1] text-white h-[36px] w-full hover:scale-[1.015] transition-all rounded-[8px] mb-5 "
              >
                View More
              </button>
            </Link>
          </div>
        </div>
        <div className="lg:px-[50px] px-[10px] flex flex-wrap mt-[20px] justify-center">
          <div className=" border-[1px] justify-center lg:justify-start border-gray-400 w-full lg:w-[48%] min-h-[455px] rounded-[15px] px-[20px]  mb-4">
            <h3 className="text-[1.5rem] font-[600] text-gray-900 mt-2 dark:text-gray-200">
              Wishlist
            </h3>
            <div
              className={`flex w-full max-h-[700px] my-3 min-h-[325px] flex-wrap overflow-auto`}
            >
              {user.wishes.length > 0 &&
                user.wishes.map((el) => <NftCard key={el.id} nft={el.nft} />)}
            </div>
            <Link href={`${user.id}/wishlist`}>
              <button
                disabled={user.wishes.length < 1}
                className=" bg-blue-500 disabled:cursor-default disabled:bg-gray-500 disabled:hover:scale-[1] text-white h-[36px] w-full hover:scale-[1.015] transition-all rounded-[8px] mb-5 "
              >
                View More
              </button>
            </Link>
          </div>
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
