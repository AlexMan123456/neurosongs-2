import { LoaderContent, LoaderError, useScreenSize } from "@alextheman/components";

import LoaderProvider from "src/components/LoaderProvider";
import SongList from "src/components/resources/songs/SongList";
import SongTable from "src/components/resources/songs/SongTable";
import { useSongsQuery } from "src/queries/songs";

function RecentSongs() {
  const { data: songs, isLoading, error } = useSongsQuery();
  const { isLargeScreen } = useScreenSize();

  return (
    <LoaderProvider isLoading={isLoading} error={error}>
      <section>
        <h2>Songs</h2>
        <LoaderError />
        <LoaderContent>
          {isLargeScreen ? <SongTable songs={songs ?? []} /> : <SongList songs={songs ?? []} />}
        </LoaderContent>
      </section>
    </LoaderProvider>
  );
}

export default RecentSongs;
