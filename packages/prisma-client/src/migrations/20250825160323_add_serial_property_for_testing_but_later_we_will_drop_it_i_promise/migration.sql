/*
  Warnings:

  - A unique constraint covering the columns `[serial]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "serial" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_serial_key" ON "public"."users"("serial");
