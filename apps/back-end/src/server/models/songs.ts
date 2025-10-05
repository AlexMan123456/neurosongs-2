import type { PublicSong } from "@neurosongs/types";

import { APIError } from "@alextheman/utility";

import getPrismaClient from "src/database/client";

export async function selectSongById(id: string): Promise<PublicSong | null> {
  const database = getPrismaClient();
  const song = await database.song.findUnique({
    where: { id },
    include: {
      artist: {
        select: {
          artistName: true,
        },
      },
    },
  });

  if (!song) {
    throw new APIError(404, "SONG_NOT_FOUND");
  }

  const songToReturn: Omit<typeof song, "artist"> & {
    artist?: { artistName: string };
    artistName: string;
  } = { ...song, artistName: song.artist.artistName };
  delete songToReturn.artist;
  return songToReturn;
}
