import React from "react";
import "./App.css";
import IssueForm from "./components/IssueForm";
import IssueList from "./components/IssueList";

function App() {
  return (
    <div className="App">
      <h1>Issues Tracker</h1>
      <IssueForm />
      <IssueList />
    </div>
  );
}

export default App;
