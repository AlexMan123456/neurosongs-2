import { Route } from "react-router-dom";

import Album from "src/resources/Albums/pages/Album";
import CreateAlbum from "src/resources/Albums/pages/mutations/CreateAlbum";

function AlbumsRouter() {
  return (
    <Route path="/albums">
      <Route path="create" element={<CreateAlbum />} />
      <Route path=":albumId" element={<Album />} />
    </Route>
  );
}

export default AlbumsRouter;
