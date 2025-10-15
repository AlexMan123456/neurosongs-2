import { Loader, useScreenSize } from "@alextheman/components";

import SongList from "src/components/resources/songs/SongList";
import SongTable from "src/components/resources/songs/SongTable";
import { useSongsQuery } from "src/queries/songs";

function RecentSongs() {
  const { data: songs, isLoading, error } = useSongsQuery();
  const { isLargeScreen } = useScreenSize();

  return (
    <section>
      <h2>Songs</h2>
      <Loader data={songs} isLoading={isLoading} error={error}>
        {(songs) => {
          return isLargeScreen ? <SongTable songs={songs} /> : <SongList songs={songs} />;
        }}
      </Loader>
    </section>
  );
}

export default RecentSongs;
