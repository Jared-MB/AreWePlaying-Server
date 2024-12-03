/*
  Warnings:

  - You are about to drop the column `notificationType` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "notificationType",
DROP COLUMN "phoneNumber",
DROP COLUMN "status";
