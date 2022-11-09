import SvgHeart from '@components/icons/svgHeart'
import SvgLoading from '@components/icons/svgLoading'
import fetcher from '@lib/fetcher'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import type { LikesResponse } from 'types/api-responses'

const LIKES_URL = (nftId: string) => `/api/nfts/${nftId}/likes`

const useLikes = (nftId: string) => {
  const { data: likes, error } = useSWR<LikesResponse>(
    `${LIKES_URL(nftId)}`,
    fetcher,
  )

  return {
    likes,
    isLoading: !error && !likes,
  }
}

const Likes: React.FC<{ nftId: string }> = ({ nftId }) => {
  const { data: session } = useSession()
  const user = session?.user
  const { likes, isLoading } = useLikes(nftId)
  const isLiked = likes?.likedBy.find((u) => u.id === user?.id)
  const [loading, setLoading] = useState(false)

  const handleLike = () => {
    if (!user) return
    setLoading(true)
    fetch('/api/put/nftLike', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: user?.id,
        nftId,
        isLiked: isLiked || false,
      }),
    })
      .then((res) => {
        if (res.ok) mutate(`${LIKES_URL(nftId)}`)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
      })
  }

  return (
    <div className="flex flex-col justify-end">
      <div className="flex flex-row justify-center items-center gap-2">
        {loading || isLoading ? (
          <div className="animate-spin ">
            <SvgLoading />
          </div>
        ) : (
          <button
            className={`flex items-center gap-2 transition-all delay-150 duration-300 
            ${isLoading ? 'opacity-0' : 'opacity-100'}
            ${
              isLiked
                ? 'text-green-500 hover:text-red-500'
                : 'text-slate-500 hover:text-green-500'
            }`}
            onClick={handleLike}
          >
            <span className="text-[1.4rem]">{likes?._count.likedBy}</span>
            <SvgHeart className="w-[28px] h-[28px]" />
          </button>
        )}
      </div>
    </div>
  )
}

export default Likes
