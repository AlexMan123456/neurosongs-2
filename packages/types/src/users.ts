import { UserInputSchema, UserModelSchema } from "@neurosongs/prisma-client/types";
import { parseDate } from "@neurosongs/utility";
import z from "zod";

export type User = z.infer<typeof UserModelSchema>;
export function parseUser(data: unknown) {
  return UserModelSchema.parse(data);
}

const publicUserSchema = UserModelSchema.omit({
  serial: true,
  email: true,
  dateOfBirth: true,
}).extend({
  memberSince: z.preprocess(parseDate, z.date()),
});
export type PublicUser = z.infer<typeof publicUserSchema>;
export function parsePublicUser(data: unknown) {
  return publicUserSchema.parse(data);
}

const apiUserSchema = publicUserSchema
  .omit({
    memberSince: true,
  })
  .extend({
    memberSince: z.preprocess(parseDate, z.date()),
  });

export type APIUser = z.infer<typeof apiUserSchema>;
export function parseAPIUser(data: unknown) {
  return apiUserSchema.parse(data);
}

const userToPostSchema = UserInputSchema.omit({
  id: true,
  serial: true,
  memberSince: true,
  dateOfBirth: true,
  profilePicture: true,
}).extend({
  dateOfBirth: z.preprocess(parseDate, z.date()),
  profilePicture: z.url().optional(),
});

export type UserToPost = z.infer<typeof userToPostSchema>;
export function parseUserToPost(data: unknown) {
  return userToPostSchema.parse(data);
}
