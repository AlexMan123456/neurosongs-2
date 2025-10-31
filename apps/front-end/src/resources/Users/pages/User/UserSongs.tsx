import { useScreenSize } from "@alextheman/components";
import CardContent from "@mui/material/CardContent";

import LoaderProvider from "src/components/LoaderProvider";
import SongsList from "src/resources/Songs/components/SongsList";
import SongsTable from "src/resources/Songs/components/SongsTable";
import { useUserSongsQuery } from "src/resources/Users/queries";

interface UserSongsProps {
  userId: string;
}

function UserSongs({ userId }: UserSongsProps) {
  const { data: songs, isPending, error } = useUserSongsQuery(userId);
  const { isLargeScreen } = useScreenSize();

  return (
    <section>
      <LoaderProvider data={songs} isLoading={isPending} error={error}>
        <CardContent>{isLargeScreen ? <SongsTable /> : <SongsList />}</CardContent>
      </LoaderProvider>
    </section>
  );
}

export default UserSongs;
