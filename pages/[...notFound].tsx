import NavBar from '@components/navbar/navbar'
import Image from 'next/image'
import React from 'react'
import notFound from '../assets/page-not-found.webp'

const NotFound = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4">
      <NavBar />
      <h1 className="text-6xl">Not Found</h1>
      <Image
        src={notFound}
        height={500}
        width={500}
        alt="page not found"
        className="rounded-3xl"
      />
    </div>
  )
}

export default NotFound
