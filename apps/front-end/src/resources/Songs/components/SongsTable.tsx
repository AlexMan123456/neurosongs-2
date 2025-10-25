import { InternalLink, LoaderData, LoaderError } from "@alextheman/components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { parsePublicSongs } from "@neurosongs/types";
import { useLocation } from "react-router-dom";

import neurosongsNote from "src/images/Neurosongs_note.png";

function SongsTable() {
  const location = useLocation();

  return (
    <>
      <LoaderError />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Album Cover</TableCell>
              <TableCell>Song</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Album</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <LoaderData dataParser={parsePublicSongs}>
              {(songs) => {
                return (
                  <>
                    {songs.map((song) => {
                      return (
                        <TableRow key={`song-${song.id}`}>
                          <TableCell>
                            <img
                              src={neurosongsNote}
                              alt={`${song.name} cover art`}
                              style={{
                                width: "70px",
                                height: "auto",
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <InternalLink to={`/songs/${song.id}`}>{song.name}</InternalLink>
                          </TableCell>
                          <TableCell>
                            {`${song.artistName} `}
                            {location.pathname.includes("/users") ? (
                              `(${song.artistUsername})`
                            ) : (
                              <InternalLink to={`/users/${song.userId}`}>
                                ({song.artistUsername})
                              </InternalLink>
                            )}
                          </TableCell>
                          <TableCell>{song.albumName}</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                );
              }}
            </LoaderData>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SongsTable;
