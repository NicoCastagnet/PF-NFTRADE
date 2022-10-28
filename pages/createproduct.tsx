import placeholder from '@assets/image-placeholder.png'
import Footer from '@components/footer'
import NavBar from '@components/navbar'
import type { NextPage } from 'next'
import Image from 'next/image'
import { useState } from 'react'

interface Account {
  id: number
  user_name: string
}

interface NFT {
  name: string
  img: File | undefined
  description?: string
  creator: Account
  price: number
  date_of_creation: string
}

const CreateProduct: NextPage = () => {
  const today = new Date()

  const user: Account = {
    id: 1,
    user_name: 'matias',
  }

  const [nft, setNft] = useState<NFT>({
    name: ' ',
    img: undefined,
    description: undefined,
    creator: user,
    price: NaN,
    date_of_creation: today.toLocaleDateString('en-US'),
  })

  const [preview, setPreview] = useState<
    string | null | undefined | ArrayBuffer
  >('')

  console.log(nft)

  function handleInput(
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLTextAreaElement>,
  ) {
    const inputValue = e.currentTarget.value
    const inputName = e.currentTarget.name
    if (inputName === 'img') {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          setPreview(reader.result)
        }
      }
      const target = e.target as HTMLInputElement
      const files: FileList | null = target.files
      if (files !== null && files[0] !== undefined) {
        reader.readAsDataURL(files[0])
        const imagefile: HTMLInputElement | null =
          document.querySelector('#fileInput')
        if (imagefile && imagefile.files !== null) {
          setNft({ ...nft, [inputName]: imagefile.files[0] })
        }
      }
    }
    setNft((prev) => ({ ...prev, [inputName]: inputValue }))
  }

  return (
    <div>
      <NavBar />
      <div className="flex justify-center mb-6">
        <div className="flex flex-col w-full justify-center items-center lg:max-w-[80%]">
          <div className="mb-6 w-[80%]">
            <label
              htmlFor="large-input"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              <span className="text-[1.2rem]">Name:</span>
            </label>
            <input
              type="text"
              id="large-input"
              className="block p-4 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-md focus:ring-blue-500 focus:border-blue-500"
              name="name"
              value={nft.name}
              onChange={handleInput}
            />
          </div>
          <div className="flex flex-col w-full justify-center items-center lg:flex-row lg:w-[80%] lg:items-start">
            <div className="flex lg:pt-6 flex-col mb-6 p-3 w-[80%] h-[58vh] items-center justify-center border-[1px] border-gray-300 bg-slate-50 rounded-[15px] lg:h-[50vh] lg:max-w-[420px] lg:min-h-[500px]">
              <div className="w-[80%] max-w-[300px] lg:max-w-[340px]">
                {preview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={String(preview)} alt="new nft" />
                ) : (
                  <Image src={placeholder} alt="image placeholder" />
                )}
              </div>
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
                  name="img"
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="flex flex-col items-center lg:items-end w-full ">
              <div className="mb-8 w-[80%]">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  <span className="text-[1.2rem]">Price:</span>
                </label>
                <input
                  type="number"
                  id="price"
                  className=" appearance-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder=""
                  required
                  name="price"
                  value={nft.price}
                  onChange={handleInput}
                />
              </div>
              <div className="w-[80%]">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  <span className="text-[1rem]">
                    Provide a description (optional)
                  </span>
                </label>
                <textarea
                  id="message"
                  rows={10}
                  className=" resize-none lg:h-[333px] text-[1rem] mb-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Description here..."
                  name="description"
                  value={nft.description}
                  onChange={handleInput}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default CreateProduct
