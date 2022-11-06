/*
  Warnings:

  - You are about to drop the `_CategoryOnCollection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryOnCollection" DROP CONSTRAINT "_CategoryOnCollection_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryOnCollection" DROP CONSTRAINT "_CategoryOnCollection_B_fkey";

-- DropTable
DROP TABLE "_CategoryOnCollection";

-- CreateTable
CREATE TABLE "_CategoriesOnNft" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoriesOnNft_AB_unique" ON "_CategoriesOnNft"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoriesOnNft_B_index" ON "_CategoriesOnNft"("B");

-- AddForeignKey
ALTER TABLE "_CategoriesOnNft" ADD CONSTRAINT "_CategoriesOnNft_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoriesOnNft" ADD CONSTRAINT "_CategoriesOnNft_B_fkey" FOREIGN KEY ("B") REFERENCES "Nft"("id") ON DELETE CASCADE ON UPDATE CASCADE;
