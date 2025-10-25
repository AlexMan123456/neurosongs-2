import type { PublicSong } from "@neurosongs/types";

import { parsePublicSongs } from "@neurosongs/types";
import { useQuery } from "@tanstack/react-query";

import neurosongsAxiosClient from "src/neurosongsAxiosClient";

export function useSongsQuery() {
  return useQuery<PublicSong[]>({
    queryKey: ["songs"],
    queryFn: async () => {
      const { data } = await neurosongsAxiosClient.get("/api/songs");
      return parsePublicSongs(data.songs);
    },
  });
}
