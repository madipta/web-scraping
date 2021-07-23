import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import AppHeader from "./components/app-header/app-header";
import Main from "./main/main";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-12 font-sans text-sm px-3 sm:px-5 md:px-8 py-24 mx-auto">
        <AppHeader></AppHeader>
        <Main></Main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
