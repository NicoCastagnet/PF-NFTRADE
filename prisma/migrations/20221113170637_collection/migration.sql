/*
  Warnings:

  - You are about to drop the column `discount` on the `Collection` table. All the data in the column will be lost.
  - Added the required column `disccount` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buys" ALTER COLUMN "amount" SET DATA TYPE REAL;

-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "discount",
ADD COLUMN     "disccount" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;
