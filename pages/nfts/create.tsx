// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import imagePlaceholder from '@assets/image-placeholder.png'
import Footer from '@components/footer'
import SvgCross from '@components/icons/svgCross'
import NavBar from '@components/navbar/navbar'
import BlurImage from '@components/ui/blurImage'
import Modal from '@components/ui/modal'
import fetcher from '@lib/fetcher'
import supabase from '@lib/supa'
import { Formik } from 'formik'
import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import useSWR from 'swr'
import type { NftDetailResponse } from 'types/api-responses'
import * as Yup from 'yup'

interface NftFormValues {
  name: string
  price: number | string
  image: string
  description?: string
  categoriesNames: string[]
}

interface Category {
  id: string
  name: string
  image?: string
  nfts: NftDetailResponse[]
}

interface Props {
  fallbackData: Category[]
}

export const validationSchema = Yup.object().shape(
  {
    name: Yup.string()
      .min(10, 'The name must have at least 10 characters.')
      .required('is required.'),
    price: Yup.number()
      .min(1, 'The lowest price is 1')
      .max(9999)
      .required('is required.'),
    image: Yup.mixed().required('Image is required.'),
    description: Yup.string()
      .nullable()
      .notRequired()
      .when('description', {
        is: (value?: string) => value?.length,
        then: (rule) =>
          rule
            .min(10, 'must be at least 10 characters')
            .max(140, 'must be at most 140 characters'),
      }),
  },
  [['description', 'description']],
)

const CreateProduct: NextPage<Props> = ({ fallbackData }) => {
  const { data: categories } = useSWR<Category[]>('/api/categories', fetcher, {
    fallbackData,
  })

  const initialValues: NftFormValues = {
    name: '',
    price: '',
    description: '',
    image: '',
    categoriesNames: [],
  }

  const [reload, setReload] = useState(false)

  function refreshStates() {
    if (reload === false) {
      setReload(true)
    } else {
      setReload(false)
    }
  }

  const [catError, setCatError] = useState<null | string>('is required.')
  function categoriesHandler(
    e: ChangeEvent<HTMLSelectElement>,
    values: NftFormValues,
  ) {
    if (values.categoriesNames.length === 5) {
      setCatError('You can add a max of 5 categories.')
    } else {
      if (values.categoriesNames.includes(e.target.value)) {
        setCatError('This category is already set.')
        refreshStates()
      } else {
        values.categoriesNames.push(e.target.value)
        setCatError(null)
        refreshStates()
      }
    }
  }
  function deleteCat(cat: string, values: NftFormValues) {
    values.categoriesNames = values.categoriesNames.filter((c) => c !== cat)
  }

  const router = useRouter()
  const { data: session, status } = useSession()
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string>('')
  const [uploadError, setUploadError] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [createdId, setCreatedId] = useState<string | null>(null)

  if (!session && status !== 'loading') {
    router.push('/login')
  }
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
        `public/${Date.now().toString().slice(0, 8)}-${file?.name}`,
        file as File,
      )

    const BUCKET_UPLOAD = process.env.NEXT_PUBLIC_SUPABASE_UPLOAD as string
    if (!error) {
      setPreview(`${BUCKET_UPLOAD}/${data.path}`)
      setUploading(false)
    } else {
      setUploadError(true)
      setPreview('')
      setUploading(false)
    }
  }

  return (
    <div className="bg-gray-200 dark:bg-[#202225] transition-all">
      <NavBar />
      <Modal
        title={`Info`}
        isOpen={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <>
          <div className="mt-2">
            <p className="text-sm text-gray-600 bg-white dark:bg-[#303339] dark:text-gray-200 transition-all outline-none focus:outline-none">
              Your nft has been successfully created.
            </p>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
              onClick={() => setOpenModal(false)}
            >
              Create other
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-gray-50 focus:outline-none"
              onClick={() => router.push(`/nfts/${createdId}`)}
            >
              Go to detail
            </button>
          </div>
        </>
      </Modal>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          if (!preview) return setSubmitting(false)
          const creatorId = session?.user.id
          const form = { ...values, creatorId, image: preview }
          fetch('/api/posts/nftPost', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          }).then(async (res) => {
            if (!res.ok) {
              setCreatedId(null)
              console.error('Failed while creating the nft.')
            }
            const { data } = await res.json()
            setOpenModal(true)
            setCreatedId(data.id)
          })
          setSubmitting(false)
          setPreview('')
          resetForm()
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center"
          >
            <div className="flex justify-center mb-6 mt-[100px] lg:mt-[120px] w-full">
              <div className="flex flex-col w-full justify-center items-center lg:max-w-[80%]">
                <div className="mb-6 lg:w-full w-[80%]">
                  <label
                    htmlFor="large-input"
                    className="flex items-center gap-2 mb-2 text-sm font-medium dark:text-gray-400"
                  >
                    <span className="text-[1.2rem]">Name*</span>
                    <span className="self-start text-red-400">
                      {errors.name && touched.name && errors.name}
                    </span>
                  </label>
                  <input
                    type="text"
                    id="large-input"
                    className="block w-full p-4 rounded-sm text-gray-600 bg-white hover:bg-gray-300 focus:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:focus:bg-[#393b41] dark:text-gray-200 transition-all outline-none focus:outline-none"
                    placeholder="NFT Name."
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full justify-center items-center lg:flex-row lg:items-start">
                  <div className="flex flex-col p-2 lg:w-full lg:h-full w-[80%] sm:min-h-[600px] h-[60vh] max-h-[400px] items-center justify-center bg-slate-50 dark:bg-[#303339] lg:max-w-[420px] lg:min-h-[500px]">
                    <div className="w-full h-full relative">
                      {uploading ? (
                        <div className="ease-in-out duration-300 absolute inset-0 h-full bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-gray-500 dark:to-slate-500 blur-lg animate-pulse" />
                      ) : preview ? (
                        <BlurImage
                          src={preview || imagePlaceholder}
                          loader={() => preview}
                        />
                      ) : (
                        <BlurImage src={preview || imagePlaceholder} />
                      )}
                    </div>
                    <span className="self-start text-red-400">
                      {errors.image && touched.image && errors.image}
                    </span>
                    <span className="self-start text-red-400">
                      {uploadError &&
                        'Failed while loading the file. Try again.'}
                    </span>
                    <div className="h-auto w-full">
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
                        value={values.image}
                        onChange={(e) => {
                          handleUpload(e)
                          handleChange(e)
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center mt-8 lg:mt-0 lg:items-end lg:w-full w-[80%] ">
                    <div className="mb-8 w-full lg:w-[80%]">
                      <label
                        htmlFor="price"
                        className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-[1.2rem]">Price*</span>
                        <span className="self-start text-red-400">
                          {errors.price && touched.price && errors.price}
                        </span>
                      </label>
                      <input
                        type="number"
                        className="block w-full p-4 rounded-sm text-gray-600 bg-white hover:bg-gray-300 focus:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:focus:bg-[#393b41] dark:text-gray-200 transition-all outline-none focus:outline-none"
                        placeholder="Only numbers allowed."
                        name="price"
                        value={values.price}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-8 w-full lg:w-[80%]">
                      <label
                        htmlFor="categories"
                        className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                      >
                        <span className="text-[1.2rem]">Categories*</span>
                        {catError !== null && (
                          <span className="self-start text-red-400">
                            {catError}
                          </span>
                        )}
                      </label>

                      <select
                        name="categories"
                        value={values.categoriesNames}
                        onChange={(e) => categoriesHandler(e, values)}
                        onBlur={handleBlur}
                        className="block w-full p-4 rounded-sm text-gray-600 bg-white hover:bg-gray-300 focus:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:focus:bg-[#393b41] dark:text-gray-200 transition-all outline-none focus:outline-none"
                      >
                        <option value="" disabled selected hidden>
                          Select a maximum of 5 categories.
                        </option>
                        {categories?.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                      <div className="flex flex-row w-full flex-wrap mt-2">
                        {values.categoriesNames?.map((c) => (
                          <div
                            className="flex flex-row justify-center items-center w-auto h-auto p-2 m-1 text-gray-600 bg-white hover:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:text-gray-200 transition-all"
                            key={c}
                          >
                            <button
                              onClick={() => deleteCat(c, values)}
                              className="mr-1"
                            >
                              <SvgCross className="w-5 h-5 fill-gray-600 dark:fill-gray-400 hover:fill-red-600 dark:hover:fill-red-600 transition-all" />
                            </button>
                            <span className="text-gray-600 dark:text-gray-400">
                              #{c}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="lg:w-[80%] w-full">
                      <label
                        htmlFor="message"
                        className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                      >
                        <span className="text-[1.2rem]">Description</span>
                        <span className="self-start text-red-400">
                          {errors.description &&
                            touched.description &&
                            errors.description}
                        </span>
                      </label>
                      <textarea
                        id="message"
                        rows={10}
                        className="resize-none block w-full p-4 rounded-sm text-gray-600 bg-white hover:bg-gray-300 focus:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:focus:bg-[#393b41] dark:text-gray-200 transition-all outline-none focus:outline-none"
                        placeholder="At least 10 characters. Max 140."
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                uploading ||
                catError !== null ||
                errors.price !== undefined ||
                errors.name !== undefined ||
                errors.image !== undefined ||
                errors.description !== undefined
              }
              className="lg:w-auto w-[80%] h-auto lg:px-[25rem] cursor-pointer py-5 m-5 dark:bg text-gray-600 bg-white hover:bg-gray-300 focus:bg-gray-300 dark:bg-[#303339] dark:hover:bg-[#393b41] dark:focus:bg-[#393b41] dark:text-gray-200 transition-all outline-none focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-[#393b41]"
            >
              Create it!
            </button>
          </form>
        )}
      </Formik>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher('/api/categories')
  return {
    props: { fallbackData: data || {} },
  }
}

export default CreateProduct
