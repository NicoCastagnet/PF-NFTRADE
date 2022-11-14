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
  console.log('click ')
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
    console.log('dentro del handle')
    if (status === 'unauthenticated') {
      console.log('not auttentication')
      toast.custom((t) => (
        <div className="flex flex-col justify-center items-center w-96 bg-white rounded-xl py-3 px-8 gap-4 ease duration-500 z-50">
          <div className="flex  text-center font-medium">
            deves estar auhenticado para realizar compras de NFT`s.
            <br />
            deseas authenticarte?
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
      console.log('dentro de valid coins')
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
        toast.error('Insufficient coins.')
      } else {
        toast.success('gracias por comprar en NFTRADE!!', { duration: 3000 })
      }
    } else {
      console.log('dentro toast buy coins')
      toast.custom(
        (t) => (
          <div className="flex flex-col justify-center items-center w-96 bg-white rounded-xl py-3 px-8 gap-4 ease duration-500 z-50">
            <div className="flex  text-center font-medium">
              las coins en su poder no son suficientes para realizar la compra
              desea adquirir mas coins?
            </div>
            <div className="flex flex-row justify-evenly items-center gap-4 w-full">
              <button
                onClick={() => {
                  toast.dismiss(t.id)
                  setTimeout(() => router.push('/buy'), 1000)
                }}
                className="flex justify-center items-center bg-blue-600 py-1 px-4 rounded-lg font-medium text-xl scale-105"
              >
                buy coins
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
