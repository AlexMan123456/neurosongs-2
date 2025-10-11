import { Route, Routes } from "react-router-dom";

import Homepage from "src/pages/Homepage";
import Recent from "src/pages/Recent";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/recent" element={<Recent />} />
    </Routes>
  );
}

export default Router;
