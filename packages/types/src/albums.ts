import { AlbumModelSchema } from "@neurosongs/prisma-client/types";
import { z } from "zod";

export type Album = z.infer<typeof AlbumModelSchema>;
export function parseAlbum(data: unknown): Album {
  return AlbumModelSchema.parse(data);
}

const publicAlbumSchema = AlbumModelSchema.omit({
  songs: true,
  artist: true,
}).extend({
  artistName: z.string(),
  artistUsername: z.string(),
});

export type PublicAlbum = z.infer<typeof publicAlbumSchema>;
export function parsePublicAlbum(data: unknown): PublicAlbum {
  return publicAlbumSchema.parse(data);
}
