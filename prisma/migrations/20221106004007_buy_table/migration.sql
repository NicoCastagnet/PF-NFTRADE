/*
  Warnings:

  - The primary key for the `Buys` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Buys` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Buys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coins` to the `Buys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Buys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Buys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Buys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Buys" DROP CONSTRAINT "Buys_pkey",
DROP COLUMN "id",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "coins" INTEGER NOT NULL,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD CONSTRAINT "Buys_pkey" PRIMARY KEY ("buyId");
