import type { PrismaClient, PublicSong } from "@neurosongs/types";

import { APIError, omitProperties } from "@alextheman/utility";
import { paginate } from "@neurosongs/utility";

export interface PaginatedSongs {
  songs: PublicSong[];
  totalSongs: number;
  limit: number;
  pageNumber: number;
  totalPages: number;
}

export interface SongFilter {
  userId?: string;
}

export async function selectSongs(
  database: PrismaClient,
  limit: number = 50,
  pageNumber: number = 1,
  filter?: Partial<SongFilter>,
): Promise<PaginatedSongs> {
  const [songs, totalSongs] = await Promise.all([
    database.song.findMany({
      omit: { serial: true },
      where: filter,
      include: {
        artist: { select: { artistName: true, username: true } },
        album: { select: { name: true } },
      },
      orderBy: [{ serial: "asc" }],
      ...paginate(limit, pageNumber),
    }),
    database.song.count(),
  ]);

  return {
    songs: songs.map((song) => {
      return {
        ...omitProperties(song, ["artist", "album"]),
        artistName: song.artist.artistName,
        artistUsername: song.artist.username,
        albumName: song.album.name,
      };
    }),
    totalSongs,
    limit,
    pageNumber,
    totalPages: Math.ceil(totalSongs / limit),
  };
}

export async function selectSongById(
  database: PrismaClient,
  id: string,
): Promise<PublicSong | null> {
  const song = await database.song.findUnique({
    where: { id },
    include: {
      artist: {
        select: {
          artistName: true,
          username: true,
        },
      },
      album: {
        select: {
          name: true,
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

  return {
    ...omitProperties(song, ["artist", "album"]),
    artistName: song.artist.artistName,
    artistUsername: song.artist.username,
    albumName: song.album.name,
  };
}
