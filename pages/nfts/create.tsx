import Footer from '@components/footer'
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
import imagePlaceholder from '/assets/image-placeholder.png'

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
  const { data: categories } = useSWR<Category[]>(
    'http://localhost:3000/api/categories',
    fetcher,
    {
      fallbackData,
    },
  )

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

  const [catError, setCatError] = useState<null | string>(
    'Select at least one category',
  )
  function categoriesHandler(
    e: ChangeEvent<HTMLSelectElement>,
    values: NftFormValues,
  ) {
    if (values.categoriesNames.length === 5) {
      setCatError('You can add a max of 5 categories')
    } else {
      if (values.categoriesNames.includes(e.target.value)) {
        setCatError('This category is already set')
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
        `public/${Date.now().toString().slice(0, 6)}-${file?.name}`,
        file as File,
      )

    const BUCKET_UPLOAD = process.env.NEXT_PUBLIC_BUCKET_UPLOAD as string
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
    <div>
      <NavBar />
      <Modal
        title={`Info`}
        isOpen={openModal}
        handleClose={() => setOpenModal(false)}
      >
        <>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
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
              console.log('Failed while creating the nft.')
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
            <div className="flex justify-center mb-6 mt-[260px] lg:mt-[120px] w-full">
              <div className="flex flex-col w-full justify-center items-center lg:max-w-[80%]">
                <div className="mb-6 w-[80%]">
                  <label
                    htmlFor="large-input"
                    className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900"
                  >
                    <span className="text-[1.2rem]">Name*</span>
                    <span className="self-start text-red-400">
                      {errors.name && touched.name && errors.name}
                    </span>
                  </label>
                  <input
                    type="text"
                    id="large-input"
                    className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500"
                    name="name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col w-full justify-center items-center lg:flex-row lg:w-[80%] lg:items-start">
                  <div className="flex lg:py-6 flex-col mb-6 p-3 w-[80%] h-[58vh] items-center justify-center border-[1px] border-gray-300 bg-slate-50 rounded-[15px] lg:h-[50vh] lg:max-w-[420px] lg:min-h-[500px]">
                    <div className="w-full h-full relative">
                      {uploading ? (
                        <div className="ease-in-out duration-300 absolute inset-0 rounded-lg h-full bg-gradient-to-r from-sky-500 to-indigo-500 blur-lg animate-pulse" />
                      ) : (
                        <BlurImage src={preview || imagePlaceholder} />
                      )}
                    </div>
                    <span className="self-start text-red-400">
                      {errors.image && touched.image && errors.image}
                    </span>
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
                        value={values.image}
                        onChange={(e) => {
                          handleUpload(e)
                          handleChange(e)
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-center lg:items-end w-full ">
                    <div className="mb-8 w-[80%]">
                      <label
                        htmlFor="price"
                        className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900 "
                      >
                        <span className="text-[1.2rem]">Price*</span>
                        <span className="self-start text-red-400">
                          {errors.price && touched.price && errors.price}
                        </span>
                      </label>
                      <input
                        type="number"
                        className=" appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 "
                        placeholder="Price..."
                        name="price"
                        value={values.price}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="mb-8 w-[80%]">
                      <label
                        htmlFor="categories"
                        className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900 "
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
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      >
                        <option value="" disabled selected hidden>
                          Select some categories
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
                            className="flex flex-row justify-center items-center bg-slate-200 rounded-[15px] p-[5px] mr-[5px] text-[0.85rem] border-gray-300 border-[2px]"
                            key={c}
                          >
                            <button
                              onClick={() => deleteCat(c, values)}
                              className="mr-[4px] ml-[2px] font-[700] text-slate-800 hover:text-slate-600 "
                            >
                              X
                            </button>
                            <span>#{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="w-[80%]">
                      <label
                        htmlFor="message"
                        className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900 "
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
                        className=" resize-none lg:h-[240px] text-[1rem] mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Description here..."
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
              className="w-[180px] h-[60px] rounded-[15px] border-[1px] border-gray-400 mb-10 hover:scale-[1.1] hover:bg-slate-900 text-[1.2rem] font-[600] hover:text-white transition-all disabled:bg-gray-500 disabled:transform-none disabled:transition-none disabled:text-white disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Footer />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await fetcher('http://localhost:3000/api/categories')
  return {
    props: { fallbackData: data || {} },
  }
}

export default CreateProduct
