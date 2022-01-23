import { useState } from "react";
import NavBack from "./components/NavBack";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import array from "./titles.json";
function App() {

  let Names = [...new Set(array)];
  return (
    <>
      < NavBar/>
      <NavBack/>
      <SearchBar inputName={Names} />
    </>

  );
}

export default App;
