import type { AlbumToPost, PrismaClient, PublicAlbum } from "@neurosongs/types";

import { APIError, omitProperties } from "@alextheman/utility";
import { parseAlbumToPost } from "@neurosongs/types";
import { paginate } from "@neurosongs/utility";

export interface PaginatedAlbums {
  albums: PublicAlbum[];
  totalAlbums: number;
  limit: number;
  pageNumber: number;
  totalPages: number;
}

export interface AlbumFilter {
  userId: string;
}

export async function selectAlbums(
  database: PrismaClient,
  limit: number = 50,
  pageNumber: number = 1,
  filter: Partial<AlbumFilter>,
): Promise<PaginatedAlbums> {
  const [albums, totalAlbums] = await Promise.all([
    database.album.findMany({
      include: {
        artist: {
          select: {
            username: true,
            artistName: true,
          },
        },
      },
      omit: { serial: true },
      where: filter,
      orderBy: [
        {
          serial: "asc",
        },
      ],
      ...paginate(limit, pageNumber),
    }),
    database.album.count({ where: filter }),
  ]);

  return {
    albums: albums.map((album) => {
      return {
        ...omitProperties(album, "artist"),
        artistName: album.artist.artistName,
        artistUsername: album.artist.username,
      };
    }),
    totalAlbums,
    limit,
    pageNumber,
    totalPages: Math.ceil(totalAlbums / limit),
  };
}

export async function selectAlbumById(
  database: PrismaClient,
  albumId: string,
): Promise<PublicAlbum> {
  const album = await database.album.findUnique({
    where: {
      id: albumId,
    },
    omit: { serial: true },
    include: {
      artist: {
        select: {
          username: true,
          artistName: true,
        },
      },
    },
  });

  if (!album) {
    throw new APIError(404, "ALBUM_NOT_FOUND");
  }

  return {
    ...omitProperties(album, "artist"),
    artistName: album.artist.artistName,
    artistUsername: album.artist.username,
  };
}

export async function postAlbum(database: PrismaClient, data: AlbumToPost) {
  const album = parseAlbumToPost(data);
  const { id } = await database.album.create({ data: album });
  return id;
}
