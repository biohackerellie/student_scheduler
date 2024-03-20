import { db, eq, schema, sql } from "@local/db";

export const classroomsQuery = db
  .select()
  .from(schema.classrooms)
  .innerJoin(schema.users, eq(schema.classrooms.teacherId, schema.users.id))
  .prepare("classrooms");

export const roomByIdQuery = db
  .select({
    id: schema.classrooms.id,
    roomNumber: schema.classrooms.roomNumber,
    teacherName: schema.users.name,
    teacherId: schema.users.id,
    available: schema.classrooms.available,
  })
  .from(schema.classrooms)
  .innerJoin(schema.users, eq(schema.classrooms.teacherId, schema.users.id))
  .where(eq(schema.classrooms.id, sql.placeholder("id")))
  .prepare("roomById");

export const getClassroomIdByTeacher = db
  .select({
    classroomId: schema.classrooms.id,
  })
  .from(schema.classrooms)
  .where(eq(schema.classrooms.teacherId, sql.placeholder("teacherId")))
  .prepare("getClassroomIdByTeacher");
