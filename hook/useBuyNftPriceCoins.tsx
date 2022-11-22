// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useCart } from '@context/cart'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useBuyNftPriceCoins = (handleClose: any) => {
  const router = useRouter()
  const { cart, removeItem, clearCart } = useCart()
  const { data: session, status } = useSession()
  const [totalPrice, setTotalPrice] = useState(0)
  const [coins, setCoins] = useState(0)
  useEffect(() => {
    setTotalPrice(0)
    cart.forEach((el) => {
      el.price
      setTotalPrice((a) => a + el.price)
    })
  }, [cart])

  useEffect(() => {
    session &&
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user/${session?.user.id}`)
        .then((res) => res.json())
        .then((res) => {
          setCoins(res.coins)
        })
  }, [session])

  const handleChange = async () => {
    if (status === 'unauthenticated') {
      toast.custom((t) => (
        <div className="flex flex-col justify-center items-center w-96 bg-white rounded-xl py-3 px-8 gap-4 ease duration-500 z-50">
          <div className="flex  text-center font-medium">
            You must be logged to buy NFT&apos;s
            <br />
            Please log in or register.
          </div>
          <div className="flex flex-row justify-evenly items-center gap-4 w-full">
            <button
              onClick={() => {
                toast.dismiss(t.id)
                setTimeout(() => router.push('/login'), 1000)
              }}
              className="flex justify-center items-center bg-blue-600 py-1 px-4 rounded-lg font-medium text-xl scale-105"
            >
              Login
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id)
                setTimeout(() => router.push('/register'), 1000)
              }}
              className="flex justify-center items-center bg-red-500 py-1 px-4 rounded-lg font-medium text-xl scale-105"
            >
              Register
            </button>
          </div>
        </div>
      ))
    } else if (coins > totalPrice) {
      clearCart()
      handleClose(false)
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/cart`,
        {
          nfts: cart,
          comprador: session?.user,
        },
      )

      if (res.status === 404) {
        toast.error(
          'You do not have sufficient coins to conclude the purchase.',
        )
      } else {
        toast.success('Purchase made successfully!', { duration: 3000 })
      }
    } else {
      toast.custom(
        (t) => (
          <div className="flex flex-col justify-center items-center w-96 bg-white rounded-xl py-3 px-8 gap-4 ease duration-500 z-50">
            <div className="flex  text-center font-medium">
              You do not have suffucient coins to conclude the purchase. Do you
              want to buy them?
            </div>
            <div className="flex flex-row justify-evenly items-center gap-4 w-full">
              <button
                onClick={() => {
                  toast.dismiss(t.id)
                  setTimeout(() => router.push('/buy'), 1000)
                }}
                className="flex justify-center items-center bg-blue-600 py-1 px-4 rounded-lg font-medium text-xl scale-105"
              >
                Buy coins
              </button>
            </div>
          </div>
        ),
        { duration: 7000 },
      )
    }
  }

  return {
    totalPrice,
    coins,
    cart,
    removeItem,
    clearCart,
    session,
    handleChange,
  }
}

export default useBuyNftPriceCoins
