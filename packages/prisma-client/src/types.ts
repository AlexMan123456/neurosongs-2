import { UserModelSchema } from "./generated/types/schemas";
import z from "zod";

const publicUserSchema = UserModelSchema.omit({
    serial: true,
    email: true,
    dateOfBirth: true
});
export type User = z.infer<typeof UserModelSchema>
export type PublicUser = z.infer<typeof publicUserSchema>;
export function newPublicUser(data: unknown){
    return publicUserSchema.safeParse(data);
}

const apiUserSchema = publicUserSchema.omit({
    memberSince: true
}).extend({
    memberSince: z.string()
})

export type APIUser = z.infer<typeof apiUserSchema>
export function newAPIUser(data: unknown){
    return apiUserSchema.safeParse(data);
}
