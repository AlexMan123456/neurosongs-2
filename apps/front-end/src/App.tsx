import { Route, Routes } from "react-router-dom";

import Navigation from "src/Navigation";
import Featured from "src/pages/Featured";
import Homepage from "src/pages/Homepage";

function App() {
  return (
    <Navigation>
      <h1>Neurosongs!</h1>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/featured" element={<Featured />} />
      </Routes>
    </Navigation>
  );
}

export default App;
