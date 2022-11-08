import type { Prisma } from '@prisma/client'

// Generic error response
export declare class ApiErrorResponse extends Error {
  readonly statusCode: number
  constructor(statusCode: number, message: string)
}

// GET: /api/nfts
export type NftsResponse = Prisma.NftGetPayload<{
  select: {
    id: true
    name: true
    image: true
    price: true
    likedBy: {
      select: {
        id: true
      }
    }
    published: true
    owner: {
      select: { name: true; id: true }
    }
    _count: {
      select: { likedBy: true; viewedBy: true }
    }
    categories: {
      select: {
        id: true
        name: true
      }
    }
  }
}>[]

export type NftResponse = Prisma.NftGetPayload<{
  select: {
    id: true
    name: true
    image: true
    price: true
    likedBy: {
      select: {
        id: true
      }
    }
    published: true
    owner: {
      select: { name: true; id: true }
    }
    _count: {
      select: { likedBy: true; viewedBy: true }
    }
    categories: true
  }
}>

// GET: /api/nfts/:id
export type NftDetailResponse = Prisma.NftGetPayload<{
  select: {
    id: true
    name: true
    image: true
    description: true
    price: true
    likedBy: {
      select: {
        id: true
      }
    }
    comments: {
      select: {
        id: true
        user: true
        content: true
        isPublished: true
      }
    }
    published: true
    owner: { select: { name: true; id: true } }
    creator: { select: { name: true } }
    _count: {
      select: { likedBy: true; viewedBy: true }
    }
    categories: {
      select: {
        id: true
        name: true
      }
    }
  }
}>

// GET: /api/categories
export type CategoriesResponse = Prisma.CategoryGetPayload<{
  select: {
    id: true
    name: true
    image: true
    _count: {
      select: { nfts: true }
    }
  }
}>[]

// GET: /api/categories/:id
export type CategoryDetailResponse = Prisma.CategoryGetPayload<{
  select: {
    id: true
    name: true
    image: true
    nfts: {
      select: {
        id: true
        name: true
        image: true
        owner: {
          select: { name: true; id: true }
        }
        _count: {
          select: { likedBy: true; viewedBy: true }
        }
      }
    }
  }
}>

// GET: /api/feed/home
export type HomeFeedResponse = Prisma.CategoryGetPayload<{
  select: {
    id: true
    name: true
    image: true
    nfts: {
      where: {
        published: true
      }
      select: {
        id: true
        name: true
        image: true
        ownerId: true
        price: true
        owner: {
          select: {
            name: true
          }
        }
        _count: {
          select: {
            likedBy: true
          }
        }
      }
    }
  }
}>[]

// GET: /api/collections
export type CollectionsResponse = Prisma.CollectionGetPayload<{
  select: {
    id: true
    name: true
    image: true
    owner: {
      select: { name: true; id: true }
    }
    _count: {
      select: { nfts: true }
    }
  }
}>[]

// GET: /api/collections/:id
export type CollectionDetailResponse = Prisma.CollectionGetPayload<{
  select: {
    id: true
    name: true
    image: true
    description: true
    disccount: true
    owner: {
      select: { name: true; id: true }
    }
    creator: {
      select: { name: true }
    }
    createdAt: true
    updatedAt: true
    nfts: {
      select: {
        id: true
        name: true
        ownerId: true
        image: true
        price: true
        owner: {
          select: { name: true; id: true }
        }
        _count: {
          select: { likedBy: true; viewedBy: true }
        }
      }
    }
  }
}>

// Search Response
export type SearchResponse = Prisma.NftGetPayload<{
  select: {
    id: true
    name: true
    image: true
    price: true
  }
}>[]

export type CommentsResponse = Prisma.CommentGetPayload<{
  select: {
    id: true
    content: true
    createdAt: true
    isPublished: true
    user: {
      select: {
        id: true
        name: true
      }
    }
  }
}>[]

export type LikesResponse = Prisma.NftGetPayload<{
  select: {
    likedBy: { select: { id: true } }
    _count: {
      select: {
        likedBy: true
      }
    }
  }
}>

export type UserDetailResponse = Prisma.UserGetPayload<{
  select: {
    id: true
    name: true
    email: true
    passwordHash: true
    emailVerified: true
    image: true
    coins: true
    collectionsCreated: {
      select: {
        id: true
        name: true
        image: true
        description: true
        disccount: true
      }
    }
    collectionsOwned: {
      select: {
        id: true
        name: true
        image: true
        description: true
        disccount: true
      }
    }
    nftsCreated: {
      take: 6
      select: { id: true; name: true; image: true; price: true }
    }
    nftsOwned: {
      take: 6
      select: { id: true; name: true; image: true; price: true }
    }
    wishes: {
      select: {
        nft: { select: { id: true; name: true; image: true; price: true } }
      }
    }
    likes: {
      select: {
        id: true
        name: true
        image: true
        price: true
      }
    }
    comments: {
      select: {
        id: true
        nft: { select: { id: true; name: true; image: true; price: true } }
        isPublished: true
        content: true
      }
    }
  }
}>
