import React from "react";
import Router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
