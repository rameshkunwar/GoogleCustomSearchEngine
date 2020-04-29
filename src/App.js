import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CustomGoogleSearch from "./GoogleSearch";

function App() {
  return (
    <div className='App'>
      <div style={{ margin: "3rem" }}>
        <CustomGoogleSearch />
      </div>
    </div>
  );
}

export default App;
