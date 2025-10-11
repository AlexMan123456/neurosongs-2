import { useScreenSize } from "@alextheman/components";

import Loading from "src/components/Loading";
import SongList from "src/components/resources/songs/SongList";
import SongTable from "src/components/resources/songs/SongTable";
import { useSongsQuery } from "src/queries/songs";

function RecentSongs() {
  const { data: songs, isLoading } = useSongsQuery();
  const { isLargeScreen } = useScreenSize();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <h2>Songs</h2>
      {isLargeScreen ? <SongTable songs={songs ?? []} /> : <SongList songs={songs ?? []} />}
    </section>
  );
}

export default RecentSongs;
