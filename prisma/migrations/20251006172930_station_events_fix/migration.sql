/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Worker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Worker_name_key" ON "Worker"("name");
