import React from "react";
import AppHeader from "./components/app-header/app-header";
import Main from "./pages/main/main";

export function App() {
  return (
    <div className="grid grid-cols-12 font-sans text-sm px-3 sm:px-5 md:px-8 py-24 mx-auto">
      <AppHeader></AppHeader>
      <Main></Main>
    </div>
  );
}

export default App;
