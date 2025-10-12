import { useScreenSize } from "@alextheman/components";

import ErrorMessage from "src/components/ErrorMessage";
import Loading from "src/components/Loading";
import SongList from "src/components/resources/songs/SongList";
import SongTable from "src/components/resources/songs/SongTable";
import { useSongsQuery } from "src/queries/songs";

function RecentSongs() {
  const { data: songs, isLoading, error } = useSongsQuery();
  const { isLargeScreen } = useScreenSize();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <section>
      <h2>Songs</h2>
      {isLargeScreen ? <SongTable songs={songs ?? []} /> : <SongList songs={songs ?? []} />}
    </section>
  );
}

export default RecentSongs;
