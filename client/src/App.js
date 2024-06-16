import React from "react";
import "./App.css";
import IssueList from "./components/IssueList";

function App() {
  return (
    <div className="App">
      <h1>Issues Tracker</h1>

      <IssueList />
    </div>
  );
}

export default App;
