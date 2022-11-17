// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { useState } from 'react'

export const useOpenFilterMenu = () => {
  const [openFilter, setOpenFilter] = useState(false)

  return { openFilter, setOpenFilter }
}
