import type { AlbumToPost, PrismaClient, PublicAlbum } from "@neurosongs/types";

import { APIError, omitProperties } from "@alextheman/utility";
import { parseAlbumToPost } from "@neurosongs/types";

export async function selectAlbumById(
  database: PrismaClient,
  albumId: string,
): Promise<PublicAlbum> {
  const album = await database.album.findUnique({
    where: {
      id: albumId,
    },
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
