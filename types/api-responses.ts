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
      select: { name: true }
    }
    _count: {
      select: { likedBy: true; viewedBy: true }
    }
    categories: true
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
      select: { name: true }
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
    categories: true
    comments: true
    published: true
    owner: { select: { name: true } }
    creator: { select: { name: true } }
    _count: {
      select: { likedBy: true; viewedBy: true }
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
          select: { name: true }
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
      select: { name: true }
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
      select: { name: true }
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
        image: true
        price: true
        owner: {
          select: { name: true }
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
