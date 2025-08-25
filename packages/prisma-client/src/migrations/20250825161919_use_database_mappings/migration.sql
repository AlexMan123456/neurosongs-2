/*
  Warnings:

  - You are about to drop the column `artistName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfBirth` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `memberSince` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."users" DROP COLUMN "artistName",
DROP COLUMN "dateOfBirth",
DROP COLUMN "memberSince",
DROP COLUMN "profilePicture",
ADD COLUMN     "artist_name" VARCHAR(100) NOT NULL DEFAULT '',
ADD COLUMN     "date_of_birth" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "member_since" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profile_picture" TEXT NOT NULL DEFAULT 'Default';
