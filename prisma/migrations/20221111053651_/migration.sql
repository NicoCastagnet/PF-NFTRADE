-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "erased" BOOLEAN DEFAULT false,
ADD COLUMN     "published" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "Nft" ADD COLUMN     "erased" BOOLEAN DEFAULT false;
