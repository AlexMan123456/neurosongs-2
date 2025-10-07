import { Route, Routes } from "react-router-dom";

import Navigation from "src/Navigation";
import Homepage from "src/pages/Homepage";
import Recent from "src/pages/Recent";

function App() {
  return (
    <Navigation>
      <h1>Neurosongs!</h1>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/recent" element={<Recent />} />
      </Routes>
    </Navigation>
  );
}

export default App;
