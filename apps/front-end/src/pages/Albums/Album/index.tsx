import { LoaderContent, LoaderError } from "@alextheman/components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";

import LoaderProvider from "src/components/LoaderProvider";
import { useAlbumQuery } from "src/queries/albums";

function Album() {
  const { albumId } = useParams<{ albumId: string }>();
  if (!albumId) {
    throw new Error("ALBUM_ID_PARAMETER_NOT_FOUND");
  }
  const { data: album, isLoading, error } = useAlbumQuery(albumId);

  return (
    <LoaderProvider isLoading={isLoading} error={error}>
      <main>
        <LoaderError />
        <LoaderContent>
          <Card>
            <CardHeader title={album?.name} />
            <Divider />
            <CardContent>{album?.description}</CardContent>
          </Card>
        </LoaderContent>
      </main>
    </LoaderProvider>
  );
}

export default Album;
