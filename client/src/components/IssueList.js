import React, { useState, useEffect } from "react";

const IssueList = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    // Fetch issues from backend
    fetch("http://localhost:8000/issue")
      .then((response) => response.json())
      .then((data) => setIssues(data.issues))
      .catch((error) => console.error("Error fetching issues:", error));
  }, []);

  return (
    <div>
      <h2>Issues</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IssueList;
