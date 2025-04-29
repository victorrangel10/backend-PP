/*
  Warnings:

  - Added the required column `PHOTO_PATH` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "PHOTO_PATH" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "PROFILE_PHOTO_PATH" TEXT NOT NULL DEFAULT '';
