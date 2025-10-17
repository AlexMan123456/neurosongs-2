import { Route, Routes } from "react-router-dom";

import Homepage from "src/pages/Homepage";
import Recent from "src/pages/Recent";
import AlbumsRouter from "src/resources/Albums/AlbumsRouter";
import UsersRouter from "src/resources/Users/UsersRouter";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/recent" element={<Recent />} />
      {UsersRouter()}
      {AlbumsRouter()}
    </Routes>
  );
}

export default Router;
