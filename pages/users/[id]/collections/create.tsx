// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import imagePlaceholder from '@assets/image-placeholder.png'
import Footer from '@components/footer'
import SvgCheck from '@components/icons/svgCheck'
import SvgCoin from '@components/icons/svgCoin'
import NavBar from '@components/navbar/navbar'
import BlurImage from '@components/ui/blurImage'
import getDataToCreateCollection from '@lib/api/users/getDataToCreateCollection'
import supabase from '@lib/supa'
import type { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import type { UserDetailResponse } from 'types/api-responses'

interface Props {
  user: UserDetailResponse
}

interface Collection {
  image: string
  name: string
  description: string
  discount: number
  price: number
  nftsId: string[]
  creatorId: string | undefined
}

const CreateCollection: NextPage<Props> = ({ user }) => {
  const router = useRouter()

  const discounts = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90,
    95,
  ]

  const [collection, setCollection] = useState<Collection>({
    image: '',
    name: '',
    description: '',
    discount: 0,
    price: 0,
    nftsId: [],
    creatorId: user.id,
  })

  const [uploadError, setUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploading(true)
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
      setCollection({
        ...collection,
        image: `${BUCKET_UPLOAD}/${data.path}`,
      })
      setUploading(false)
    } else {
      setUploadError(true)
      setUploading(false)
    }
  }

  function handleChange(
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) {
    const inputName = e.target.name
    let inputValue: string | number = e.target.value

    validateErrors(e)

    if (e.target.name === 'discount') {
      inputValue = parseInt(inputValue)
      const newPrice = totalPrice * (1 - inputValue / 100)
      setCollection({
        ...collection,
        price: Math.round(newPrice),
        [inputName]: inputValue,
      })
    } else {
      setCollection({ ...collection, [inputName]: inputValue })
    }
  }

  const [totalPrice, setTotalPrice] = useState(0)

  async function handleNfts(id: string, price: number) {
    if (collection.nftsId.includes(id)) {
      setTotalPrice((prev) => prev - price)
      const newPrice = totalPrice - price
      setCollection((prev) => ({
        ...prev,
        nftsId: collection.nftsId.filter((nftId) => nftId !== id),
        price: Math.round(newPrice * (1 - collection.discount / 100)),
      }))
    } else {
      setTotalPrice((prev) => prev + price)
      const newPrice = totalPrice + price
      setCollection((prev) => ({
        ...prev,
        nftsId: [...collection.nftsId, id],
        price: Math.round(newPrice * (1 - collection.discount / 100)),
      }))
    }
    if (collection.nftsId.length < 3) {
      setError({
        ...error,
        nftsId: 'You must select at least 3 NFTs',
      })
    }
  }

  const [loading, setLoading] = useState(false)

  function validate(collection: Collection) {
    const error = {}

    if (!collection.name) {
      error.name = 'Name missing'
    } else if (collection.name.length < 3) {
      error.name = 'Name must have at least 3 characters'
    } else if (collection.name.length > 24) {
      error.name = 'Name must have less than 24 characters'
    }

    if (!collection.image) {
      error.image = 'Image missing'
    }

    if (!collection.description) {
      error.description = 'Description missing'
    } else if (collection.description.length < 10) {
      error.description = 'Description must have at least 10 characters'
    } else if (collection.description.length > 140) {
      error.description = 'Description must have at less than 140 characters'
    }

    return error
  }

  const [error, setError] = useState({
    name: 'Name missing',
    image: '',
    description: '',
    nftsId: '',
  })

  if (collection.nftsId.length < 3) {
    error.nftsId = 'You must select at least 3 NFTs'
  } else {
    error.nftsId = ''
  }

  function validateErrors(
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLSelectElement>
      | ChangeEvent<HTMLTextAreaElement>,
  ) {
    const objError = validate({
      ...collection,
      [e.target.name]: e.target.value,
    })
    setError(objError)
  }

  const [createdId, setCreatedId] = useState('')

  async function submitCollection() {
    setLoading(true)
    await fetch('/api/posts/collectionPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(collection),
    })
      .then((r) => r.json())
      .then((r) => setCreatedId(r.id))

    await fetch('/api/put/published', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nftsId: collection.nftsId,
        published: false,
      }),
    })

    setCollection({
      image: '',
      name: '',
      description: '',
      discount: 0,
      price: 0,
      nftsId: [],
      creatorId: user.id,
    })
    setLoading(false)
    setCreatedModal(true)
  }

  const nfts = user.nftsOwned

  const [createdModal, setCreatedModal] = useState(false)

  return (
    <div>
      <NavBar />
      <div>
        <div
          className={` ${
            createdModal === true
              ? 'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1] bg-gray-200 dark:bg-zinc-800 p-8 rounded-[15px] border transition-all'
              : 'hidden'
          } `}
        >
          <div className="mt-2">
            <p className="text-sm text-gray-600 dark:text-gray-200 transition-all outline-none focus:outline-none">
              Your collection has been successfully created.
            </p>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              onClick={() => setCreatedModal(false)}
            >
              Create other
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-gray-50 focus:outline-none"
              onClick={() => router.push(`/collections/${createdId}`)}
            >
              Go to detail
            </button>
          </div>
        </div>

        <div className="mt-[100px] flex items-center flex-col">
          <div className="w-[80%]   mb-[60px] lg:flex-row flex-col items-center lg:items-start flex ">
            <div className="flex flex-col p-2 w-full lg:w-[600px] h-[70vh] lg:mr-10 items-center justify-center bg-slate-50 dark:bg-[#303339] lg:max-w-[420px] lg:min-h-[500px]">
              <div className=" lg:h-full h-full w-full relative">
                {uploading ? (
                  <div className="ease-in-out duration-300 absolute inset-0 h-full bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-gray-500 dark:to-slate-500 blur-lg animate-pulse" />
                ) : collection.image ? (
                  <BlurImage
                    loader={() => collection.image}
                    src={collection.image || imagePlaceholder}
                  />
                ) : (
                  <BlurImage src={collection.image || imagePlaceholder} />
                )}
              </div>
              <span className="self-start text-red-400">
                {uploadError && 'Failed while loading the file. Try again.'}
              </span>
              <div className="h-auto w-full">
                {error.image && (
                  <span className=" text-red-800">{error.image}* </span>
                )}
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer text-gray-600 bg-gray-200 hover:bg-gray-300 dark:bg-[#393b41] dark:hover:bg-[#2c2d30] dark:text-gray-400 h-auto py-4 mb-0 mt-10 flex items-center justify-center transition-all"
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
                    handleChange(e)
                  }}
                />
              </div>
            </div>
            <div className="lg:w-[450px] w-full lg:mr-10">
              <div className="mb-6 w-full  mr-10">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="name"
                    className="flex items-center gap-2 mb-2 text-[1.4rem] font-medium text-gray-600 dark:text-gray-400"
                  >
                    Collection Name
                  </label>
                  {error.name && (
                    <span className=" text-red-800">{error.name}*</span>
                  )}
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={collection.name}
                  onChange={(e) => handleChange(e)}
                  className="block p-4 w-full text-gray-600 border-gray-400 border-[1px] bg-white hover:bg-gray-300 focus:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:focus:bg-[#393b41] dark:text-gray-200 transition-all outline-none focus:outline-none"
                />
              </div>
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="description"
                    className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                  >
                    <span className="text-[1.2rem]">Description</span>
                  </label>
                  {error.description && (
                    <span className=" text-red-800">{error.description}*</span>
                  )}
                </div>
                <textarea
                  id="description"
                  value={collection.description}
                  rows={10}
                  onChange={(e) => handleChange(e)}
                  className=" border-gray-400 border-[1px] resize-none block w-full p-4 rounded-sm text-gray-600 bg-white hover:bg-gray-300 focus:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:focus:bg-[#393b41] dark:text-gray-200 transition-all outline-none focus:outline-none"
                  placeholder="At least 10 characters. Max 140."
                  name="description"
                  // value={values.description}
                  // onChange={handleChange}
                ></textarea>
              </div>
              <div className="w-full flex justify-center">
                <button
                  onClick={submitCollection}
                  className="w-full h-[60px] bg-blue-600 rounded-[10px] mt-10 text-[1.4rem] font-[600] hover:scale-[1.04] transition-all disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:scale-[1]"
                  disabled={
                    error.name ||
                    error.description ||
                    error.image ||
                    error.nftsId
                  }
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="flex flex-col mt-[10px] lg:w-[300px] w-full ">
              <div>
                <label
                  htmlFor="discount"
                  className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  <span className="text-[1.2rem]">Discount</span>
                </label>
                <select
                  name="discount"
                  value={collection.discount}
                  id="discount"
                  // value={values.categoriesNames}
                  onChange={(e) => handleChange(e)}
                  className=" block border-gray-400 border-[1px] w-full p-4 rounded-sm text-gray-600 bg-white hover:bg-gray-300 focus:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:focus:bg-[#393b41] dark:text-gray-200 transition-all outline-none focus:outline-none"
                >
                  <option value="" disabled selected hidden>
                    Select a discount
                  </option>
                  {discounts.map((c) => (
                    <option key={c} value={c}>
                      {c}%
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="finalPrice"
                  className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-600 dark:text-gray-400"
                >
                  <span className="text-[1.2rem]">Final Price</span>
                </label>
                <span
                  id="finalPrice"
                  className=" border-gray-400 border-[1px] block w-full p-4 rounded-sm text-gray-600 bg-white hover:bg-gray-300  dark:bg-[#303339] dark:hover:bg-[#393b41] dark:focus:bg-[#393b41] dark:text-gray-200 transition-all outline-none focus:outline-none"
                >
                  {collection.price}
                </span>
              </div>
            </div>
          </div>
          <div className=" mb-[60px] w-[80%]">
            <div className="mb-5">
              <h3 className="flex items-center gap-2  text-[2rem] font-medium text-gray-600 dark:text-gray-400">
                Select some NFTs for your new collection
              </h3>
              <div>
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  (At least 3)
                </span>
                {error.nftsId && (
                  <span className=" ml-2 text-red-800">{error.nftsId}*</span>
                )}
              </div>
            </div>
            <div className="flex justify-center items-center ">
              <div className="flex min-h-[900px] p-4 justify-center items-center pt-5 lg:p-8 border-[1px] border-gray-400 rounded-[15px] w-full flex-wrap">
                {nfts.length > 0 &&
                  nfts.map((el) => (
                    <div
                      onClick={() => {
                        el.collectionId ? null : handleNfts(el.id, el.price)
                      }}
                      key={el.id}
                      className={` mb-6 lg:w-[30%] lg:min-w-[284px] lg:mr-10 lg:max-w-[287px] lg:h-[380px] overflow-hidden relative flex flex-col bg-gray-800 rounded-xl p-[1px] border-slate-900 cursor-pointer group  dark:bg-stone-900 dark:border-[1px]   dark:border-gray-400  group shadow-lg shadow-zinc-500`}
                    >
                      <div
                        className={`${
                          collection.nftsId.includes(el.id)
                            ? 'w-[80px] bg-blue-600 h-[80px] absolute top-[56%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1] rounded-full p-4'
                            : ' hidden '
                        } transition-all `}
                      >
                        <SvgCheck />
                      </div>
                      <div
                        className={`
                      ${
                        el.collectionId
                          ? 'w-[80%] bg-gray-600 rounded-full absolute top-[56%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1] p-3'
                          : 'hidden'
                      }
                       transition-all `}
                      >
                        <p className=" text-center text-[1.2rem] ">
                          {' '}
                          This nft is already in a collection{' '}
                        </p>
                      </div>
                      <div
                        className={` ${
                          el.collectionId && ' cursor-default blur-[2px] '
                        } ${
                          collection.nftsId.includes(el.id) &&
                          'opacity-70 blur-[2px]'
                        } ${el.collectionId && 'opacity-70'} transition-all`}
                      >
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
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await getDataToCreateCollection({ id: params?.id as string })
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

export default CreateCollection
