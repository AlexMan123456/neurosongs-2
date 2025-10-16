/*
  Warnings:

  - A unique constraint covering the columns `[serial]` on the table `albums` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "albums" ADD COLUMN     "serial" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "albums_serial_key" ON "albums"("serial");
