import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navigation from "src/components/Navigation";
import Router from "src/Router";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Navigation>
        <h1>Neurosongs!</h1>
        <Router />
      </Navigation>
    </QueryClientProvider>
  );
}

export default App;
