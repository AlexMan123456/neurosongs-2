import { InternalLink, LoaderData, LoaderError } from "@alextheman/components";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { parsePublicSongs } from "@neurosongs/types";
import { useLocation } from "react-router-dom";

import neurosongsNote from "src/images/Neurosongs_note.png";

function SongsList() {
  const location = useLocation();

  return (
    <>
      <LoaderError />
      <LoaderData dataParser={parsePublicSongs}>
        {(songs) => {
          return (
            <List>
              {songs.map((song) => {
                return (
                  <ListItem key={`song-${song.id}`}>
                    <ListItemAvatar>
                      <Avatar src={neurosongsNote} alt={`${song.name} cover art`} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<InternalLink to={`/songs/${song.id}`}>{song.name}</InternalLink>}
                      secondary={
                        <>
                          {`${song.artistName} `}
                          {location.pathname.includes("/users") ? (
                            `(${song.artistUsername})`
                          ) : (
                            <InternalLink to={`/users/${song.userId}`}>
                              ({song.artistUsername})
                            </InternalLink>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>
          );
        }}
      </LoaderData>
    </>
  );
}

export default SongsList;
