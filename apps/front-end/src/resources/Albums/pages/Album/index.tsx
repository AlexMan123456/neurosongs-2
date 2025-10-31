import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";

import Loader from "src/components/Loader";
import { useAlbumQuery } from "src/resources/Albums/queries";

function Album() {
  const { albumId } = useParams<{ albumId: string }>();
  if (!albumId) {
    throw new TypeError("ALBUM_ID_PARAMETER_NOT_FOUND");
  }
  const { data: album, isPending, error } = useAlbumQuery(albumId);

  return (
    <Loader
      data={album}
      isLoading={isPending}
      error={error}
      onNullable={() => {
        return <Alert severity="error">This album could not be provided.</Alert>;
      }}
    >
      {(album) => {
        return (
          <main>
            <Card>
              <CardHeader title={album.name} />
              <Divider />
              <CardContent>{album.description}</CardContent>
            </Card>
          </main>
        );
      }}
    </Loader>
  );
}

export default Album;
