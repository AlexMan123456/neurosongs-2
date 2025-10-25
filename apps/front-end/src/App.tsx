import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navigation from "src/components/Navigation";
import neurosongsLogo from "src/images/Neurosongs_WebIcon.png";
import Router from "src/Router";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation>
        <title>Neurosongs</title>
        <h1>
          <img style={{ width: "300px", height: "auto" }} src={neurosongsLogo} alt="Neurosongs" />
        </h1>
        <Router />
      </Navigation>
    </QueryClientProvider>
  );
}

export default App;
