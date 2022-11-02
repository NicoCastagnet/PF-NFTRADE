-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coins" DOUBLE PRECISION DEFAULT 0;

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "nftId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT true,
    "content" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "Nft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
