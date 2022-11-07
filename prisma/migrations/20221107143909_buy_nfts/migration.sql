-- CreateTable
CREATE TABLE "BuyNfts" (
    "nftsId" TEXT NOT NULL,
    "compradorId" TEXT NOT NULL,
    "vendedorId" TEXT NOT NULL,
    "coins" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BuyNfts_pkey" PRIMARY KEY ("nftsId")
);
