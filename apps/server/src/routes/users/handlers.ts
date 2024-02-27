import { NotFoundError } from "elysia";

import { getCachedUsers, setCachedUsers } from "~/lib/redis";

export async function cachedUsers(id: string) {
  try {
    const res = await getCachedUsers(id);
    if (!res) {
      throw new Error("Unable to get chat messages");
    }
    return res;
  } catch (e) {
    throw new NotFoundError("No user found with that ID");
  }
}

export async function setCachedUser(body: {
  key: string;
  object: { name: string; role: string };
}) {
  try {
    return await setCachedUsers(body);
  } catch (e) {
    throw new NotFoundError("Error adding user to cache");
  }
}

export async function cachedTeachers() {
  try {
    return await getCachedUsers();
  } catch (e) {
    throw new NotFoundError("No teachers found");
  }
}
