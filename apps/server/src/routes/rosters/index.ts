import { Elysia, t } from "elysia";

import {
  getRosters,
  getRostersById,
  getStudentRoster,
  getTeacherRoster,
  newRequest,
  setStudentRoster,
} from "./handlers";

export const rosterRoutes = new Elysia({ prefix: "/rosters" })
  .get("/", () => getRosters())
  .get("/:id", ({ params: { id } }) => getRostersById(id), {
    params: t.Object({
      id: t.String(),
    }),
  })
  .get("/student/:email", ({ params: { email } }) => getStudentRoster(email), {
    params: t.Object({
      email: t.String(),
    }),
  })
  .get(
    "/teacher/roster/:email",
    ({ params: { email } }) => getTeacherRoster(email),
    {
      params: t.Object({
        email: t.String(),
      }),
    },
  )
  .post(
    "/request/:requestId",
    ({ params: { requestId }, body: { request } }) =>
      newRequest(requestId, request),

    {
      params: t.Object({
        requestId: t.String(),
      }),
      body: t.Object({
        request: t.Object({
          id: t.String(),
          status: t.String(),
          timestamp: t.Number(),
          studentId: t.String(),
          currentTeacher: t.String(),
          newTeacher: t.String(),
        }),
      }),
    },
  )
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
