import { AlbumInputSchema, AlbumModelSchema } from "@neurosongs/prisma-client/types";
import { z } from "zod";

const albumSchema = AlbumModelSchema.omit({ songs: true, artist: true });
export type Album = z.infer<typeof albumSchema>;
export function parseAlbum(data: unknown): Album {
  return albumSchema.parse(data);
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

const albumMutationSchema = AlbumInputSchema.omit({
  id: true,
  songs: true,
  artist: true,
});

const albumToPostSchema = albumMutationSchema;
export type AlbumToPost = z.infer<typeof albumToPostSchema>;
export function parseAlbumToPost(data: unknown): AlbumToPost {
  return albumToPostSchema.parse(data);
}

const albumToPutSchema = albumMutationSchema
  .omit({
    userId: true,
  })
  .partial();
export type AlbumToPut = z.infer<typeof albumToPutSchema>;
export function parseAlbumToPut(data: unknown): AlbumToPut {
  return albumToPutSchema.parse(data);
}
