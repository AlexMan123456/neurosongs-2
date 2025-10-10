import Loading from "src/components/Loading";
import { useSongsQuery } from "src/queries/songs";

function RecentSongs() {
  const { data: songs } = useSongsQuery();
  return (
    <section>
      <h2>Songs</h2>
      {songs ? (
        songs.map((song) => {
          return song.name;
        })
      ) : (
        <Loading />
      )}
    </section>
  );
}

export default RecentSongs;
