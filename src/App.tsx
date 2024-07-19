import AppRouter from "@/components/router";

import { Toaster } from "@/utils/toaster/toaster";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Suspense, useEffect, useState, lazy } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const useShowTanstackDevtools = () => {
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-expect-error assigning property to the window object
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  return {
    showDevtools,
  };
};

const ReactQueryDevtoolsProduction = lazy(() =>
  import("@tanstack/react-query-devtools/production").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

function App() {
  const { showDevtools } = useShowTanstackDevtools();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <Toaster />
        {showDevtools && (
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        )}
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
