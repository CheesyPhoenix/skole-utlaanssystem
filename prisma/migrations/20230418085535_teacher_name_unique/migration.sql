/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `TeacherRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "TeacherRequest_name_key" ON "TeacherRequest"("name");
