import SvgLoading from '@components/icons/svgLoading'
import SvgTrash from '@components/icons/svgTrash'
import fetcher from '@lib/fetcher'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import type { CommentsResponse } from 'types/api-responses'

const COMMENTS_URL = 'http://localhost:3000/api/comments/'

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
    fetch('http://localhost:3000/api/delete/comment', {
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
        console.log(e)
        setDisabled(false)
      })
  }

  async function submitComment() {
    if (comment.length > 0) {
      setDisabled(true)
      fetch('http://localhost:3000/api/comments/create', {
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
          console.log(e)
          setDisabled(false)
        })
      setComment('')
    }
  }

  return (
    <div>
      <div className="w-[1200px] border-[1px] border-gray-400 rounded-[15px] p-4 mb-4">
        <h3 className="text-[1.4rem] flex items-center gap-2">
          <span>Comments</span>{' '}
          {disabled ? (
            <div className="text-base text-blue-600 animate-spin">
              <SvgLoading />
            </div>
          ) : null}
        </h3>
        <div className="h-[400px] overflow-auto">
          {isLoading ? (
            <>Loading...</>
          ) : comments ? (
            comments.map(
              (c) =>
                c.isPublished == true && (
                  <div
                    key={c.id}
                    className="border-[1px] border-gray-300 rounded-[15px] mt-2"
                  >
                    <div className="flex justify-between items-center bg-slate-100 rounded-[15px] h-[30px] rounded-bl-[0] rounded-br-[0]">
                      <div className="flex">
                        <p className="text-[1rem] mr-2 ml-2">From: </p>
                        <p className="text-[1rem] font-[500] hover:text-slate-600 cursor-pointer">
                          {c.user.name}
                        </p>
                      </div>
                      {c.user.id === user?.id && (
                        <button
                          className="mr-3 hover:fill-red-600"
                          onClick={() => handleDelete(c.id)}
                        >
                          <SvgTrash width={18} height={18} />
                        </button>
                      )}
                    </div>
                    <hr />
                    <div className="p-2">
                      <p className="text-[1rem] lg:text-[1rem] ml-2">
                        {c.content}
                      </p>
                    </div>
                  </div>
                ),
            )
          ) : (
            <span> There are no comments yet </span>
          )}
        </div>
      </div>

      {user && (
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Write a comment
          </label>
          <textarea
            id="message"
            rows={4}
            className="resize-none block p-2.5 w-full text-[1rem] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Your message..."
            maxLength={400}
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            onClick={submitComment}
            disabled={disabled}
            className="border-[1px] border-gray-300 rounded-[10px] mt-2 p-2 bg-orange-400 hover:bg-orange-500 transition-all"
          >
            Comment
          </button>
        </div>
      )}
    </div>
  )
}

export default Comments
