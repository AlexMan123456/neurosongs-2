import { APIError } from "@alextheman/utility";

import database from "src/database/connection";

export async function selectUserById(id: string) {
  const user = await database.user.findUnique({ where: { id } });
  if (!user) {
    throw new APIError(404, "USER_NOT_FOUND");
  }
  return user;
}
