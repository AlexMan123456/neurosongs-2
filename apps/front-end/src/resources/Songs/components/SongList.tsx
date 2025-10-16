import type { PublicSong } from "@neurosongs/types";

import { InternalLink } from "@alextheman/components";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { useLocation } from "react-router-dom";

import neurosongsNote from "src/images/Neurosongs_note.png";

export interface SongListProps {
  songs: PublicSong[];
}

function SongList({ songs }: SongListProps) {
  const location = useLocation();

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
}

export default SongList;
