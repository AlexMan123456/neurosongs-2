import { APIError } from "@alextheman/utility";

import { getPrismaClient } from "src/database/client";

export async function selectUsers() {
  const database = getPrismaClient();
  const users = await database.user.findMany({
    select: {
      id: true,
      username: true,
      description: true,
      artistName: true,
      memberSince: true,
      profilePicture: true,
    },
    orderBy: [
      {
        serial: "asc",
      },
    ],
  });
  return users;
}

export async function selectUserById(id: string) {
  const database = getPrismaClient();
  const user = await database.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      description: true,
      artistName: true,
      memberSince: true,
      profilePicture: true,
    },
  });
  if (!user) {
    throw new APIError(404, "USER_NOT_FOUND");
  }
  return user;
}
