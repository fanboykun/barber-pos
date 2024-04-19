/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.
  - Made the column `phone` on table `customers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `customers` MODIFY `phone` BIGINT NOT NULL,
    MODIFY `total_point` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Customers_phone_key` ON `Customers`(`phone`);
