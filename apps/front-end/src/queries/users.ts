import type { PublicUser } from "@neurosongs/types";

import { parsePublicUser } from "@neurosongs/types";
import { useQuery } from "@tanstack/react-query";

import neurosongsAxiosClient from "src/queries/neurosongsAxiosClient";

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
