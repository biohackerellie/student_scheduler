/*
  Warnings:

  - The primary key for the `classrooms` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_classroomId_fkey";

-- AlterTable
ALTER TABLE "classrooms" DROP CONSTRAINT "classrooms_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "classrooms_id_seq";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "classroomId" SET DEFAULT '',
ALTER COLUMN "classroomId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
