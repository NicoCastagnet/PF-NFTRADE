/*
  Warnings:

  - You are about to drop the column `disccount` on the `Collection` table. All the data in the column will be lost.
  - Added the required column `discount` to the `Collection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" DROP COLUMN "disccount",
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL;
