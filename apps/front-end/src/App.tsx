import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

import Navigation from "src/Navigation";
import Homepage from "src/pages/Homepage";
import Recent from "src/pages/Recent";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation>
        <h1>Neurosongs!</h1>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/recent" element={<Recent />} />
        </Routes>
      </Navigation>
    </QueryClientProvider>
  );
}

export default App;
