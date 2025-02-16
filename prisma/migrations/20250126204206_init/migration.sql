-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "programName" TEXT NOT NULL,
    "advertiserName" TEXT NOT NULL,
    "networkName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "commissionRate" DOUBLE PRECISION,
    "epc" DOUBLE PRECISION,
    "url" TEXT,
    "logoUrl" TEXT,
    "cookieDuration" INTEGER,
    "currency" TEXT,
    "market" TEXT NOT NULL,
    "feed" BOOLEAN,
    "pendingActive" BOOLEAN,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Program_category_idx" ON "Program"("category");

-- CreateIndex
CREATE INDEX "Program_networkName_idx" ON "Program"("networkName");

-- CreateIndex
CREATE INDEX "Program_market_idx" ON "Program"("market");

-- CreateIndex
CREATE UNIQUE INDEX "Program_programName_networkName_key" ON "Program"("programName", "networkName");
