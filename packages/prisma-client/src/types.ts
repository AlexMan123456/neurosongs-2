import { User } from "./generated/prisma";

export type PublicUser = Omit<User, "serial" | "email" | "dateOfBirth">;
