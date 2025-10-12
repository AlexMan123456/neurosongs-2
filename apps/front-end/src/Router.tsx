import { Route, Routes } from "react-router-dom";

import Homepage from "src/pages/Homepage";
import Recent from "src/pages/Recent";
import UserProfile from "src/pages/Users/User/UserProfile";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/recent" element={<Recent />} />
      <Route path="/users">
        <Route path=":userId" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

export default Router;
