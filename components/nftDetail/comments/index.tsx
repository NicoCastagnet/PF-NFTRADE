import SvgLoading from '@components/icons/svgLoading'
import SvgTrash from '@components/icons/svgTrash'
import fetcher from '@lib/fetcher'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useSWR, { mutate } from 'swr'
import type { CommentsResponse } from 'types/api-responses'

const COMMENTS_URL = '/api/comments/'

const useComments = (nftId: string) => {
  const { data: comments, error } = useSWR<CommentsResponse>(
    `${COMMENTS_URL}/${nftId}`,
    fetcher,
  )

  return {
    comments,
    isLoading: !error && !comments,
  }
}

const Comments: React.FC<{ nftId: string }> = ({ nftId }) => {
  const { data: session } = useSession()
  const user = session?.user
  const [comment, setComment] = useState('')
  const { comments, isLoading } = useComments(nftId)
  const [disabled, setDisabled] = useState(false)

  async function handleDelete(commentId: string) {
    setDisabled(true)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/delete/comment`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentId,
      }),
    })
      .then(async (res) => {
        if (res.ok) mutate(`${COMMENTS_URL}/${nftId}`)
        setDisabled(false)
      })
      .catch((e) => {
        console.error(e)
        setDisabled(false)
      })
    toast.success('Comment deleted successfully!')
  }

  async function submitComment() {
    if (comment.length > 0) {
      setDisabled(true)
      fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/comments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user?.id,
          nftId,
          content: comment,
        }),
      })
        .then(async (res) => {
          if (res.ok) mutate(`${COMMENTS_URL}/${nftId}`)
          setDisabled(false)
        })
        .catch((e) => {
          console.error(e)
          setDisabled(false)
        })
      setComment('')
      toast.success('Comment posted successfully!')
    } else {
      toast.error('You must write something!')
    }
  }

  return (
    <div className="flex flex-col h-full w-full justify-center mb-10">
      <article className="w-full border-2 border-gray-100 dark:border-[#303339] rounded-t-xl">
        <header className="flex justify-between items-center text-xl font-semibold px-5 w-full h-[50px] rounded-t-md bg-gray-100 dark:bg-[#303339]">
          <span className="text-gray-600 dark:text-gray-400 max-sm:text-base">
            Comments
          </span>
          {disabled ? (
            <div className="text-base text-white animate-spin">
              <SvgLoading />
            </div>
          ) : null}
        </header>
        <div className="flex flex-col justify-end h-auto overflow-auto p-5">
          {isLoading ? (
            <>Loading...</>
          ) : comments ? (
            comments.map(
              (c) =>
                c.isPublished == true && (
                  <div key={c.id} className="my-2">
                    <div className="flex justify-between items-center bg-white dark:bg-[#303339] h-8">
                      <div className="flex text-gray-600 dark:text-gray-400">
                        <p className="mr-2 ml-2">From: </p>
                        <p className="font-bold hover:text-white transition-all cursor-pointer">
                          {c.user.name}
                        </p>
                      </div>
                      {c.user.id === user?.id && (
                        <button
                          className="mr-3 fill-[#9d9fa6] hover:fill-red-600 transition-all"
                          onClick={() => handleDelete(c.id)}
                        >
                          <SvgTrash width={18} height={18} />
                        </button>
                      )}
                    </div>
                    <hr />
                    <div className="p-2 border-2 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-[#303339]">
                      <p className="text-[1rem] lg:text-[1rem] ml-2">
                        {c.content}
                      </p>
                    </div>
                  </div>
                ),
            )
          ) : (
            <div className="my-2">
              <p>Nothing here</p>
            </div>
          )}
          {user && (
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Drop your opinion about this NFT!
              </label>
              <textarea
                id="message"
                rows={4}
                className="resize-none block p-2.5 w-full text-[1rem] text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-[#303339] outline-none max-sm:text-sm"
                placeholder="Type your opinion here."
                maxLength={400}
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                onClick={submitComment}
                disabled={disabled}
                className="text-xl bg-gray-100 hover:bg-gray-300 text-gray-600 dark:text-gray-400 dark:bg-[#303339] dark:hover:bg-[#393b41] hover:drop-shadow-lg transition-all w-full py-3 px-20 border-t border-gray-200 max-sm:text-base"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}

export default Comments
