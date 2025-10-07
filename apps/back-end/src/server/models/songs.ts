import type { PublicSong } from "@neurosongs/types";

import { APIError, omitProperties } from "@alextheman/utility";
import { paginate } from "@neurosongs/utility";

import getPrismaClient from "src/database/client";

export interface PaginatedSongs {
  songs: PublicSong[];
  totalSongs: number;
  limit: number;
  pageNumber: number;
  totalPages: number;
}

export async function selectSongs(
  limit: number = 50,
  pageNumber: number = 1,
): Promise<PaginatedSongs> {
  const database = getPrismaClient();
  const [songs, totalSongs] = await Promise.all([
    database.song.findMany({
      omit: { serial: true },
      include: { artist: { select: { artistName: true } } },
      orderBy: [{ serial: "asc" }],
      ...paginate(limit, pageNumber),
    }),
    database.song.count(),
  ]);

  return {
    songs: songs.map((song) => {
      return { ...omitProperties(song, "artist"), artistName: song.artist.artistName };
    }),
    totalSongs,
    limit,
    pageNumber,
    totalPages: Math.ceil(totalSongs / limit),
  };
}

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
    omit: {
      serial: true,
    },
  });

  if (!song) {
    throw new APIError(404, "SONG_NOT_FOUND");
  }

  return { ...omitProperties(song, "artist"), artistName: song.artist.artistName };
}
