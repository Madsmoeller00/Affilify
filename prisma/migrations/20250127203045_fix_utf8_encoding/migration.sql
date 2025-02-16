/*
  Warnings:

  - You are about to alter the column `programName` on the `Program` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `advertiserName` on the `Program` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `networkName` on the `Program` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `category` on the `Program` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `currency` on the `Program` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `market` on the `Program` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `categoryMapping` on the `Program` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Program" ALTER COLUMN "programName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "advertiserName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "networkName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "category" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "currency" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "market" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "categoryMapping" SET DATA TYPE VARCHAR(255);
