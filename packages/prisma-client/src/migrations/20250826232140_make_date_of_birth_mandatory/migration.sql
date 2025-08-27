/*
  Warnings:

  - Made the column `date_of_birth` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."users" ALTER COLUMN "date_of_birth" SET NOT NULL,
ALTER COLUMN "date_of_birth" SET DEFAULT CURRENT_TIMESTAMP;
