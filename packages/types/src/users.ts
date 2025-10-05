import { UserInputSchema, UserModelSchema } from "@neurosongs/prisma-client/types";
import { parseDate } from "@neurosongs/utility";
import z from "zod";

const userSchema = UserModelSchema.omit({ songs: true, albums: true });
export type User = z.infer<typeof userSchema>;
export function parseUser(data: unknown): User {
  return userSchema.parse(data);
}

const publicUserSchema = UserModelSchema.omit({
  serial: true,
  email: true,
  dateOfBirth: true,
  songs: true,
  albums: true,
}).extend({
  memberSince: z.preprocess(parseDate, z.date()),
});
export type PublicUser = z.infer<typeof publicUserSchema>;
export function parsePublicUser(data: unknown): PublicUser {
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
export function parseAPIUser(data: unknown): APIUser {
  return apiUserSchema.parse(data);
}

const userToPostSchema = UserInputSchema.omit({
  id: true,
  serial: true,
  memberSince: true,
  dateOfBirth: true,
  profilePicture: true,
  songs: true,
  albums: true,
}).extend({
  dateOfBirth: z.preprocess(parseDate, z.date()),
  profilePicture: z.string().optional(),
});

export type UserToPost = z.infer<typeof userToPostSchema>;
export function parseUserToPost(data: unknown): UserToPost {
  return userToPostSchema.parse(data);
}

const userToPutSchema = UserInputSchema.omit({
  id: true,
  serial: true,
  memberSince: true,
  dateOfBirth: true,
  email: true,
  songs: true,
  albums: true,
}).extend({
  username: z.string().optional(),
  artistName: z.string().optional(),
  profilePicture: z.string().optional(),
  description: z.string().optional(),
});

export type UserToPut = Partial<z.infer<typeof userToPutSchema>>;
export function parseUserToPut(data: unknown): UserToPut {
  return userToPutSchema.parse(data);
}
