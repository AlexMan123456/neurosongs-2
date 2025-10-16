import type { PublicAlbum } from "@neurosongs/types";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

import neurosongsNote from "src/images/Neurosongs_note.png";

export interface AlbumGridProps {
  albums: PublicAlbum[];
}

function AlbumGrid({ albums }: AlbumGridProps) {
  return (
    <Grid container spacing={2}>
      {albums.map((album) => {
        return (
          <Card
            key={`album-${album.id}`}
            sx={{
              border: "black",
              margin: 2,
              backgroundColor: (theme) => {
                return theme.darken(theme.palette.background.paper, 0.2);
              },
            }}
          >
            <CardMedia
              component="img"
              src={neurosongsNote}
              alt={`${album.name}'s front cover`}
              sx={{ padding: 2 }}
            />
            <CardHeader title={album.name} />
            <CardContent>{album.artistName}</CardContent>
          </Card>
        );
      })}
    </Grid>
  );
}

export default AlbumGrid;
