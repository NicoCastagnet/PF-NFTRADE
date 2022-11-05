-- CreateTable
CREATE TABLE "Buys" (
    "id" TEXT NOT NULL,
    "buyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Buys_pkey" PRIMARY KEY ("id")
);
