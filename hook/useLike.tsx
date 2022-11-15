// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const useLiked = (likedBy) => {
  const { data: session } = useSession()
  const [likedCount, setLikedCount] = useState(likedBy.length as number)
  const li = likedBy.map((el) => el.id)
  const [likedByMe, setLikedByMe] = useState(
    li.includes(session?.user.id) as boolean,
  )

  const likeHandler = async (nftId) => {
    if (!likedByMe) {
      setLikedCount((state) => state + 1)
      setLikedByMe((state) => !state)
    } else {
      setLikedCount((state) => state - 1)
      setLikedByMe((state) => !state)
    }
    await axios.put('/api/put/nftLike', {
      nftId,
      userId: session?.user.id,
      isLiked: likedByMe,
    })
  }

  return { session, likedCount, likeHandler }
}

export default useLiked
