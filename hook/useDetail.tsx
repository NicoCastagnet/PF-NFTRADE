// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import type { NftDetailResponse } from 'types/api-responses'

const useDetail = (nft: NftDetailResponse) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [subState, setSubState] = useState({
    admin: false,
    wishlisted: false,
    loadingWish: false,
    loadingPublished: false,
    published: nft?.published,
    deleteWarning: false,
    priceToEdit: false,
    price: nft?.price,
  })


  useEffect(() => {
    if (session?.user) {
      axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/put/nftViews`, {
        userId: session?.user?.id,
        nftId: nft?.id,
      })
    }
    if (nft.wishedBy.includes(session?.user?.id)) {
      setSubState((state) => ({ ...state, wishlisted: true }))
    }

    axios
      .get(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/user/${session?.user.id}/getIsAdmin/`,
      )
      .then((res) => setSubState((state) => ({ ...state, admin: res.data })))
  }, [nft?.id, session?.user?.id])

  async function addToWished() {
    setSubState((state) => ({ ...state, loadingWish: true }))

    if (nft.wishedBy.includes(session?.user?.id)) {
      setSubState((state) => ({ ...state, wishlisted: false }))

      nft.wishedBy = nft?.wishedBy.filter((w) => w !== session?.user?.id)
    } else {
      nft.wishedBy.push(session?.user?.id)
      setSubState((state) => ({ ...state, wishlisted: true }))
    }
    await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/put/wishes`, {
      nftId: nft?.id,
      userId: session?.user?.id,
    }),
      setSubState((state) => ({ ...state, loadingWish: false }))
  }

  async function deleteNft() {
    await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/put/nftPutErased`, {
      id: nft?.id,
      collectionId: nft?.collectionId,
    }),
      router.push(`/`)
  }

  async function handlePublished(boolean: boolean) {
    setSubState((state) => ({
      ...state,
      loadingPublished: true,
      published: boolean,
    }))

    await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/put/published`, {
      nftId: nft?.id,
      published: boolean,
    }),
      setSubState((state) => ({ ...state, loadingPublished: false }))
  }

  async function putPrice() {
    await axios.put(`${process.env.NEXT_PUBLIC_APP_URL}/api/put/nftPrice`, {
      nftId: nft?.id,
      price: parseFloat(subState.price),
    }),
      setSubState((state) => ({ ...state, priceToEdit: false }))
  }

  return {
    session,
    subState,
    setSubState,
    addToWished,
    deleteNft,
    handlePublished,
    putPrice,
  }
}

export default useDetail