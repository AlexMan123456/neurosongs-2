import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";

import ErrorMessage from "src/components/ErrorMessage";
import Loading from "src/components/Loading";
import { useAlbumQuery } from "src/queries/albums";

function Album() {
  const { albumId } = useParams<{ albumId: string }>();
  if (!albumId) {
    throw new Error("ALBUM_ID_PARAMETER_NOT_FOUND");
  }
  const { data: album, isLoading, error } = useAlbumQuery(albumId);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <main>
      <Card>
        <CardHeader title={album?.name} />
        <Divider />
        <CardContent>{album?.description}</CardContent>
      </Card>
    </main>
  );
}

export default Album;
