import { InternalLink } from "@alextheman/components";
import Button from "@mui/material/Button";

import LoaderProvider from "src/components/LoaderProvider";
import AlbumGrid from "src/resources/Albums/components/AlbumGrid";
import { useUserAlbumsQuery } from "src/resources/Users/queries";

interface UserAlbumsProps {
  userId: string;
}

function UserAlbums({ userId }: UserAlbumsProps) {
  const { data: albums, isPending, error } = useUserAlbumsQuery(userId);

  return (
    <LoaderProvider data={albums} isLoading={isPending} error={error}>
      <Button component={InternalLink} to="/albums/create">
        Create Album
      </Button>
      <AlbumGrid />
    </LoaderProvider>
  );
}

export default UserAlbums;
