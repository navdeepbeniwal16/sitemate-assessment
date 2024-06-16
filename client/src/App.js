import React from "react";
import Home from "./components/Home.js";
import NewIssue from "./components/NewIssue.js";
import EditIssue from "./components/EditIssue.js";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewIssue />} />
        <Route path="/edit/:id" element={<EditIssue />} />
      </Routes>
    </Router>
  );
};

export default App;
