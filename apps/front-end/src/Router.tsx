import { Route, Routes } from "react-router-dom";

import Album from "src/pages/Albums/Album";
import CreateAlbum from "src/pages/Albums/mutations/CreateAlbum";
import Homepage from "src/pages/Homepage";
import Recent from "src/pages/Recent";
import User from "src/pages/Users/User";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/recent" element={<Recent />} />
      <Route path="/users">
        <Route path=":userId" element={<User />} />
      </Route>
      <Route path="/albums">
        <Route path="create" element={<CreateAlbum />} />
        <Route path=":albumId" element={<Album />} />
      </Route>
    </Routes>
  );
}

export default Router;
