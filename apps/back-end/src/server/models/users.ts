import database from "src/database/connection";

export async function selectUserById(id: string) {
  return await database.user.findUnique({ where: { id } });
}
