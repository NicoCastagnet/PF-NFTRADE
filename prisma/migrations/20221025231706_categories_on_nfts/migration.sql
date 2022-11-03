/*
  Warnings:

  - You are about to drop the `CategoriesOnNfts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnNfts" DROP CONSTRAINT "CategoriesOnNfts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnNfts" DROP CONSTRAINT "CategoriesOnNfts_nftId_fkey";

-- DropTable
DROP TABLE "CategoriesOnNfts";

-- CreateTable
CREATE TABLE "_CategoryOnCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryOnCollection_AB_unique" ON "_CategoryOnCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryOnCollection_B_index" ON "_CategoryOnCollection"("B");

-- AddForeignKey
ALTER TABLE "_CategoryOnCollection" ADD CONSTRAINT "_CategoryOnCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryOnCollection" ADD CONSTRAINT "_CategoryOnCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;
