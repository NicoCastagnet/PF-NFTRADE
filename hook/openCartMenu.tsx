// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState } from 'react'

export const useOpenMenu = () => {
  const [open, setOpen] = useState(false)

  return { open, setOpen }
}
