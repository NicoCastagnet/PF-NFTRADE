-- CreateTable
CREATE TABLE "Buys" (
    "buyId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "coins" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Buys_pkey" PRIMARY KEY ("buyId")
);
