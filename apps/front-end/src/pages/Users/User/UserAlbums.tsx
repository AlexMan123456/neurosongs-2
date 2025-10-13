import { InternalLink } from "@alextheman/components";
import Button from "@mui/material/Button";

interface UserAlbumsProps {
  userId: string;
}

function UserAlbums({ userId }: UserAlbumsProps) {
  return (
    <>
      <Button component={InternalLink} to="/albums/create">
        Create Album
      </Button>
      <p>Coming soon!</p>
      <p>{userId}</p>
    </>
  );
}

export default UserAlbums;
