/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[USER_EMAIL]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `USER_EMAIL` to the `users` table without a default value. This is not possible if the table is not empty.
  - The required column `USER_ID` was added to the `users` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `USER_NAME` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
ADD COLUMN     "USER_EMAIL" TEXT NOT NULL,
ADD COLUMN     "USER_ID" TEXT NOT NULL,
ADD COLUMN     "USER_NAME" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("USER_ID");

-- CreateIndex
CREATE UNIQUE INDEX "users_USER_EMAIL_key" ON "users"("USER_EMAIL");
