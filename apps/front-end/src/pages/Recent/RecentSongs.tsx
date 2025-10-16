import { Loader, useScreenSize } from "@alextheman/components";

import SongList from "src/resources/Songs/components/SongList";
import SongTable from "src/resources/Songs/components/SongTable";
import { useSongsQuery } from "src/resources/Songs/song-queries";

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
