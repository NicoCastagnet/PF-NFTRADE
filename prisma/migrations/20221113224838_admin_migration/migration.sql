-- AlterTable
ALTER TABLE "Buys" ALTER COLUMN "amount" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "price" DROP NOT NULL;
