import type { PublicUser, PublicAlbum, PublicSong } from "@neurosongs/types";

import { parsePublicAlbum, parsePublicSongs, parsePublicUser } from "@neurosongs/types";
import { useQuery } from "@tanstack/react-query";

import neurosongsAxiosClient from "src/neurosongsAxiosClient";

export function useUserQuery(userId: string) {
  return useQuery<PublicUser>({
    queryKey: ["users"],
    queryFn: async () => {
      const {
        data: { user },
      } = await neurosongsAxiosClient.get(`/api/users/${userId}`);
      return parsePublicUser(user);
    },
  });
}

export function useUserAlbumsQuery(userId: string) {
  return useQuery<PublicAlbum[]>({
    queryKey: ["users", userId, "albums"],
    queryFn: async () => {
      const {
        data: { albums },
      } = await neurosongsAxiosClient.get(`/api/users/${userId}/albums`);
      return albums.map((album: unknown) => {
        return parsePublicAlbum(album);
      });
    },
  });
}

export function useUserSongsQuery(userId: string) {
  return useQuery<PublicSong[]>({
    queryKey: ["users", userId, "songs"],
    queryFn: async () => {
      const {
        data: { songs },
      } = await neurosongsAxiosClient.get(`/api/users/${userId}/songs`);
      return parsePublicSongs(songs);
    },
  });
}
