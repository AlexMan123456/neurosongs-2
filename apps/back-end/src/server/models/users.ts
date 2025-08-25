import { APIError } from "@alextheman/utility";

import { getPrismaClient } from "src/database/client";

export async function selectUserById(id: string) {
  const database = getPrismaClient();
  const user = await database.user.findUnique({ where: { id } });
  if (!user) {
    throw new APIError(404, "USER_NOT_FOUND");
  }
  return user;
}
