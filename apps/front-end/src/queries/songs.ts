import type { PublicSong } from "@neurosongs/types";

import { parsePublicSong } from "@neurosongs/types";
import { useQuery } from "@tanstack/react-query";

import neurosongsAxiosClient from "src/queries/neurosongsAxiosClient";

export function useSongsQuery() {
  return useQuery<PublicSong[]>({
    queryKey: ["songs"],
    queryFn: async () => {
      const { data } = await neurosongsAxiosClient.get("/api/songs");
      return data.songs.map((song: unknown) => {
        return parsePublicSong(song);
      });
    },
  });
}
