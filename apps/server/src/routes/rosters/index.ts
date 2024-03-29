import { Elysia, t } from "elysia";

import {
  getRosters,
  getRostersById,
  getStudentRoster,
  getTeacherRoster,
  setAttendance,
  setStudentRoster,
} from "./handlers";

export const rosterRoutes = new Elysia({ prefix: "/rosters" })
  .get("/all", () => getRosters())
  .get("/id/:id", ({ params: { id } }) => getRostersById(id), {
    params: t.Object({
      id: t.String(),
    }),
  })
  .get(
    "/student/id/:userId",
    ({ params: { userId } }) => getStudentRoster(userId),
    {
      params: t.Object({
        userId: t.String(),
      }),
    },
  )
  .get(
    "/teacher/roster/:userId",
    ({ params: { userId } }) => getTeacherRoster(userId),
    {
      params: t.Object({
        userId: t.String(),
      }),
    },
  )
  .post("/attendance/", ({ body: { rosterId } }) => setAttendance(rosterId), {
    body: t.Object({
      rosterId: t.Number(),
    }),
  })

  .post(
    "/student/:email",
    ({ params: { email }, body: { roomNumber, teacherName } }) =>
      setStudentRoster(email, roomNumber, teacherName),
    {
      params: t.Object({
        email: t.String(),
      }),
      body: t.Object({
        roomNumber: t.String(),
        teacherName: t.String(),
      }),
    },
  );
