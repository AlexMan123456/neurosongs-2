import type { PublicUser, UserToPost, UserToPut } from "@neurosongs/types";

import { APIError } from "@alextheman/utility";
import { parseUserToPost, parseUserToPut } from "@neurosongs/types";
import { paginate } from "@neurosongs/utility";

import getPrismaClient from "src/database/client";

export interface PaginatedUsers {
  users: PublicUser[];
  totalUsers: number;
  limit: number;
  pageNumber: number;
  totalPages: number;
}

export async function selectUsers(
  limit: number = 50,
  pageNumber: number = 1,
): Promise<PaginatedUsers> {
  const database = getPrismaClient();
  const [users, totalUsers] = await Promise.all([
    database.user.findMany({
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
      ...paginate(limit, pageNumber),
    }),
    database.user.count(),
  ]);

  return { users, totalUsers, limit, pageNumber, totalPages: Math.ceil(totalUsers / limit) };
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
