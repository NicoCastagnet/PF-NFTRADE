import { useState } from 'react'

export const useOpenMenu = () => {
  const [open, setOpen] = useState(false)

  return { open, setOpen }
}
