/*
  Warnings:

  - A unique constraint covering the columns `[serial]` on the table `songs` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "serial" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "songs_serial_key" ON "songs"("serial");
