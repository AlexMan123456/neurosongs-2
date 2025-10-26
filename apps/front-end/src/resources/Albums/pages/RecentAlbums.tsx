import LoaderProvider from "src/components/LoaderProvider";
import AlbumGrid from "src/resources/Albums/components/AlbumGrid";
import { useAlbumsQuery } from "src/resources/Albums/queries";

function RecentAlbums() {
  const { data: albums, isPending, error } = useAlbumsQuery();
  return (
    <section>
      <h2>Albums</h2>
      <LoaderProvider data={albums} isLoading={isPending} error={error}>
        <AlbumGrid />
      </LoaderProvider>
    </section>
  );
}

export default RecentAlbums;
