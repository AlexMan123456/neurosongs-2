import z from "zod";

import { UserModelSchema } from "./generated/types/schemas";

const publicUserSchema = UserModelSchema.omit({
  serial: true,
  email: true,
  dateOfBirth: true,
});
export type User = z.infer<typeof UserModelSchema>;
export type PublicUser = z.infer<typeof publicUserSchema>;
export function parsePublicUser(data: unknown) {
  return publicUserSchema.parse(data);
}

const apiUserSchema = publicUserSchema
  .omit({
    memberSince: true,
  })
  .extend({
    memberSince: z.string(),
  });

export type APIUser = z.infer<typeof apiUserSchema>;
export function parseAPIUser(data: unknown) {
  return apiUserSchema.parse(data);
}
