import { useCart } from '@context/cart'
import { useEffect, useState } from 'react'

export const useTotalPrice = () => {
  const { cart } = useCart()
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setTotalPrice(0)
    cart.forEach((el) => {
      el.price
      setTotalPrice((a) => a + el.price)
    })
  }, [cart])
  return { totalPrice }
}
