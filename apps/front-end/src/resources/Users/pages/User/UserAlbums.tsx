import { InternalLink } from "@alextheman/components";
import Button from "@mui/material/Button";

import LoaderProvider from "src/components/LoaderProvider";
import AlbumsGrid from "src/resources/Albums/components/AlbumsGrid";
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
      <AlbumsGrid />
    </LoaderProvider>
  );
}

export default UserAlbums;
