import { SkeletonRow, useScreenSize } from "@alextheman/components";

import LoaderProvider from "src/components/LoaderProvider";
import SongList from "src/resources/Songs/components/SongList";
import SongTable from "src/resources/Songs/components/SongTable";
import { useSongsQuery } from "src/resources/Songs/queries";

function RecentSongs() {
  const { data: songs, isPending, error } = useSongsQuery();
  const { isLargeScreen } = useScreenSize();

  return (
    <section>
      <h2>Songs</h2>
      <LoaderProvider
        data={songs}
        isLoading={isPending}
        error={error}
        loadingComponent={isLargeScreen ? <SkeletonRow columns={4} /> : undefined}
      >
        {isLargeScreen ? <SongTable /> : <SongList />}
      </LoaderProvider>
    </section>
  );
}

export default RecentSongs;
