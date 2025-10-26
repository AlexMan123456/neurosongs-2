import LoaderProvider from "src/components/LoaderProvider";
import AlbumsGrid from "src/resources/Albums/components/AlbumsGrid";
import { useAlbumsQuery } from "src/resources/Albums/queries";

function RecentAlbums() {
  const { data: albums, isPending, error } = useAlbumsQuery();
  return (
    <section>
      <h2>Albums</h2>
      <LoaderProvider data={albums} isLoading={isPending} error={error}>
        <AlbumsGrid />
      </LoaderProvider>
    </section>
  );
}

export default RecentAlbums;
