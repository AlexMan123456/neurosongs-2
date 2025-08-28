import type { PublicUser, UserToPost, UserToPut } from "@neurosongs/types";

import { APIError } from "@alextheman/utility";
import { parseUserToPost, parseUserToPut } from "@neurosongs/types";

import getPrismaClient from "src/database/client";

export async function selectUsers(): Promise<PublicUser[]> {
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

export async function selectUserById(id: string): Promise<PublicUser> {
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

export async function insertUser(user: UserToPost): Promise<string> {
  const database = getPrismaClient();
  const validatedUser = parseUserToPost(user);
  const { id } = await database.user.create({ data: validatedUser });
  return id;
}

export async function updateUser(id: string, user: UserToPut): Promise<void> {
  const database = getPrismaClient();
  const validatedUser = parseUserToPut(user);
  await database.user.update({ where: { id }, data: validatedUser });
}
