/*
  Warnings:

  - The `status` column on the `Purchase` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[auth_user_id]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PurchaseStatus" AS ENUM ('PENDING', 'APPROVED', 'FAILED');

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "auth_user_id" TEXT;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "status",
ADD COLUMN     "status" "PurchaseStatus" NOT NULL DEFAULT E'PENDING';

-- DropEnum
DROP TYPE "PurchaseStates";

-- CreateIndex
CREATE UNIQUE INDEX "Customer_auth_user_id_key" ON "Customer"("auth_user_id");
