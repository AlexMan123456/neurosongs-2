import { Route, Routes } from "react-router-dom";

import Homepage from "src/pages/Homepage";
import Recent from "src/pages/Recent";
import Album from "src/resources/Albums/pages/Album";
import CreateAlbum from "src/resources/Albums/pages/mutations/CreateAlbum";
import User from "src/resources/Users/pages/User";

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
