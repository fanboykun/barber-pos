/*
  Warnings:

  - You are about to drop the `stylists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_stylistId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `code` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `stylists`;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_stylistId_fkey` FOREIGN KEY (`stylistId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
