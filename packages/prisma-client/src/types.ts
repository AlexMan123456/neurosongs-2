import { UserModelSchema } from "./generated/types/schemas";
import z from "zod";

const publicUserSchema = UserModelSchema.omit({
    serial: true,
    email: true,
    dateOfBirth: true
});
export type PublicUser = z.infer<typeof publicUserSchema>;
export function newPublicUser(data: unknown){
    return publicUserSchema.safeParse(data);
}
