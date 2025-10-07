import { SongModelSchema } from "@neurosongs/prisma-client/types";
import { z } from "zod";

export type Song = z.infer<typeof SongModelSchema>;
export function parseSong(data: unknown): Song {
  return SongModelSchema.parse(data);
}

const publicSongSchema = SongModelSchema.omit({
  album: true,
  userId: true,
  artist: true,
  releaseDate: true,
  serial: true,
}).extend({
  releaseDate: z.coerce.date(),
  userId: z.uuid(),
  artistName: z.string(),
});
export type PublicSong = z.infer<typeof publicSongSchema>;
export function parsePublicSong(data: unknown): PublicSong {
  return publicSongSchema.parse(data);
}
