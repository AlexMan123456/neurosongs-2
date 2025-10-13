import { useScreenSize } from "@alextheman/components";

import Loader from "src/components/Loader";
import SongList from "src/components/resources/songs/SongList";
import SongTable from "src/components/resources/songs/SongTable";
import { useSongsQuery } from "src/queries/songs";

function RecentSongs() {
  const { data: songs, isLoading, error } = useSongsQuery();
  const { isLargeScreen } = useScreenSize();

  return (
    <section>
      <h2>Songs</h2>
      <Loader isLoading={isLoading} error={error}>
        {isLargeScreen ? <SongTable songs={songs ?? []} /> : <SongList songs={songs ?? []} />}
      </Loader>
    </section>
  );
}

export default RecentSongs;
