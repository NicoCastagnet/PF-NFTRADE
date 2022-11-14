// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// react-hooks/rules-of-hooks

import axios from 'axios'
import type { NextPage } from 'next'
import { useState } from 'react'
import { HiAtSymbol } from 'react-icons/hi'
import styles from '../styles/form.module.css'
import { Toaster } from 'react-hot-toast'


const ForgottenPass: NextPage = () => {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/resetpass`, {
      email: email,
    })
  }

  return (
    <>
      <div className="flex h-screen w-full justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-2"
        >
          <div className="flex flex-row justify-between  w-full max-w-sm border-2 border-slate-300 rounded-xl py-1 px-2">
            <input
              className={`bg-transparent focus:outline-none w-full ${styles.input_text}`}
              type="email"
              placeholder={'Email'}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="icon flex items-center pl-2">
              <HiAtSymbol size={28} />
            </span>
          </div>
          <button className="bg-blue-500 py-1 w-full max-w-sm rounded-lg text-xl font-extrabold text-slate-900">
            submit
          </button>
        </form>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default ForgottenPass
