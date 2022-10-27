/*
  Warnings:

  - You are about to drop the column `userId` on the `Nft` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Nft" DROP CONSTRAINT "Nft_userId_fkey";

-- AlterTable
ALTER TABLE "Nft" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "_UserLikedNfts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserViewedNfts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserLikedNfts_AB_unique" ON "_UserLikedNfts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserLikedNfts_B_index" ON "_UserLikedNfts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserViewedNfts_AB_unique" ON "_UserViewedNfts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserViewedNfts_B_index" ON "_UserViewedNfts"("B");

-- AddForeignKey
ALTER TABLE "_UserLikedNfts" ADD CONSTRAINT "_UserLikedNfts_A_fkey" FOREIGN KEY ("A") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedNfts" ADD CONSTRAINT "_UserLikedNfts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserViewedNfts" ADD CONSTRAINT "_UserViewedNfts_A_fkey" FOREIGN KEY ("A") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserViewedNfts" ADD CONSTRAINT "_UserViewedNfts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
