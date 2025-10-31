import { useScreenSize } from "@alextheman/components";

import LoaderProvider from "src/components/LoaderProvider";
import SongsList from "src/resources/Songs/components/SongsList";
import SongsTable from "src/resources/Songs/components/SongsTable";
import { useSongsQuery } from "src/resources/Songs/queries";

function RecentSongs() {
  const { data: songs, isPending, error } = useSongsQuery();
  const { isLargeScreen } = useScreenSize();

  return (
    <section>
      <h2>Songs</h2>
      <LoaderProvider data={songs} isLoading={isPending} error={error}>
        {isLargeScreen ? <SongsTable /> : <SongsList />}
      </LoaderProvider>
    </section>
  );
}

export default RecentSongs;
