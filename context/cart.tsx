import { createContext, useContext, useEffect, useState } from 'react'
import type { NftResponse } from 'types/api-responses'

const CART_KEY = 'pf-nftrade-cart'

type CartItem = Pick<NftResponse, 'id' | 'name' | 'image' | 'price'>

interface CartContext {
  cart: CartItem[]
  clearCart: () => void
  removeItem: (id: string) => void
  addItem: (newItem: CartItem) => void
  isInCart: (id: string) => boolean | undefined
}

const CartContext = createContext<CartContext>({
  cart: [],
  clearCart: () => {
    console.log('cleaning cart')
  },
  removeItem: (id: string) => {
    console.log('removing item ' + id)
  },
  addItem: (newItem: CartItem) => {
    console.log('adding item ' + newItem.id)
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInCart: (id: string) => undefined,
})

const getFromLocalStorage = () => {
  let items
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    items = localStorage.getItem(CART_KEY)
  }
  return items ? JSON.parse(items) : []
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => getFromLocalStorage())

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const clearCart = () => setCart([])

  const removeItem = (id: string) =>
    setCart(cart.filter((item) => item.id !== id))

  const addItem = (newItem: CartItem) => {
    if (cart.find((item) => item.id === newItem.id)) return
    setCart([newItem, ...cart])
  }

  const isInCart = (id: string) => {
    const item = cart.find((i) => i.id === id)
    if (item) return true
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        clearCart,
        removeItem,
        addItem,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext<CartContext>(CartContext)
