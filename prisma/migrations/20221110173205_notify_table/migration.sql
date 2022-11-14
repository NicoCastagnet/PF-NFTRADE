-- CreateTable
CREATE TABLE "Notify" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "typeNotify" TEXT NOT NULL,
    "ordenId" TEXT,
    "nameUser" TEXT,
    "nftId" TEXT,
    "nameNft" TEXT,
    "creatorNft" TEXT,
    "compradorId" TEXT,
    "nameComprador" TEXT,
    "vendedorId" TEXT,
    "nameVendedor" TEXT,
    "coins" DOUBLE PRECISION,
    "amount" DOUBLE PRECISION,
    "status" TEXT,
    "userIdComment" TEXT,
    "nameUserComment" TEXT,
    "comment" TEXT,
    "owner" TEXT,
    "ownerId" TEXT,
    "view" BOOLEAN NOT NULL DEFAULT false,
    "userIdLiked" TEXT,
    "nameUserLiked" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notify_pkey" PRIMARY KEY ("id")

);

