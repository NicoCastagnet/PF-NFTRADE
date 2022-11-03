import { useState } from 'react'

export const useOpenFilterMenu = () => {
  const [openFilter, setOpenFilter] = useState(false)

  return { openFilter, setOpenFilter }
}
