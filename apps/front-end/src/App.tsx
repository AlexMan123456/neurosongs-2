import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

import Navigation from "src/components/Navigation";
import neurosongsLogo from "src/images/Neurosongs_WebIcon.png";
import ErrorPage from "src/pages/ErrorPage";
import Router from "src/Router";

function App() {
  const queryClient = new QueryClient();
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        FallbackComponent={ErrorPage}
        onReset={() => {
          navigate("/");
        }}
      >
        <Navigation>
          <title>Neurosongs</title>
          <h1>
            <img style={{ width: "300px", height: "auto" }} src={neurosongsLogo} alt="Neurosongs" />
          </h1>
          <Router />
        </Navigation>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
