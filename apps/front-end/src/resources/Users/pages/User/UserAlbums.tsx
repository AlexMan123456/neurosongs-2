import { InternalLink } from "@alextheman/components";
import Button from "@mui/material/Button";

import Loader from "src/components/Loader";
import AlbumGrid from "src/resources/Albums/components/AlbumGrid";
import { useUserAlbumsQuery } from "src/resources/Users/queries";

interface UserAlbumsProps {
  userId: string;
}

function UserAlbums({ userId }: UserAlbumsProps) {
  const { data: albums, isPending, error } = useUserAlbumsQuery(userId);

  return (
    <>
      <Button component={InternalLink} to="/albums/create">
        Create Album
      </Button>
      <Loader data={albums} isLoading={isPending} error={error}>
        {(albums) => {
          return <AlbumGrid albums={albums} />;
        }}
      </Loader>
    </>
  );
}

export default UserAlbums;
