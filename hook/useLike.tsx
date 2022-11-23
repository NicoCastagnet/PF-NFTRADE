import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const useLiked = (likedBy = [{ id: '' }]) => {
  const { data: session } = useSession()
  const userId: any = session?.user.id
  const [likedCount, setLikedCount] = useState(likedBy.length as number)
  const li = likedBy.map((el) => el.id)
  const [likedByMe, setLikedByMe] = useState(li.includes(userId) as boolean)

  const likeHandler = async (nftId = '') => {
    if (!likedByMe) {
      setLikedCount((state) => state + 1)
      setLikedByMe((state) => !state)
    } else {
      setLikedCount((state) => state - 1)
      setLikedByMe((state) => !state)
    }
    await axios.put('/api/put/nftLike', {
      nftId,
      userId,
      isLiked: likedByMe,
    })
  }

  return { session, likedCount, likeHandler }
}

export default useLiked
