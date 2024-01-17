-- CreateTable
CREATE TABLE "classRosters" (
    "id" TEXT NOT NULL,
    "studentEmail" TEXT NOT NULL,
    "classroomId" TEXT NOT NULL,

    CONSTRAINT "classRosters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "classRosters" ADD CONSTRAINT "classRosters_classroomId_fkey" FOREIGN KEY ("classroomId") REFERENCES "classrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
