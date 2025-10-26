import type { AlbumToPost, PublicAlbum } from "@neurosongs/types";

import { parsePublicAlbum, parsePublicAlbums } from "@neurosongs/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import neurosongsAxiosClient from "src/neurosongsAxiosClient";

export function useAlbumQuery(albumId: string) {
  return useQuery<PublicAlbum>({
    queryKey: ["albums", albumId],
    queryFn: async () => {
      const {
        data: { album },
      } = await neurosongsAxiosClient.get(`/api/albums/${albumId}`);
      return parsePublicAlbum(album);
    },
  });
}

export function useAlbumsQuery() {
  return useQuery<PublicAlbum[]>({
    queryKey: ["albums"],
    queryFn: async () => {
      const {
        data: { albums },
      } = await neurosongsAxiosClient.get("/api/albums");
      return parsePublicAlbums(albums);
    },
  });
}

export function useCreateAlbumMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: AlbumToPost) => {
      const {
        data: { albumId },
      } = await neurosongsAxiosClient.post("/api/albums", data);
      return albumId;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["albums"] });
    },
  });
}
