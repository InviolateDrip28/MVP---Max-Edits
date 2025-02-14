/*
  Warnings:

  - Added the required column `currencyTo` to the `TransactionTable` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `TransactionTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionTable" ADD COLUMN     "currencyTo" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL;
