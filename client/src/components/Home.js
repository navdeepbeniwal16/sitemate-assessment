import { useEffect, useState } from "react";
import IssueService from "../services/IssueService";
import { Link } from "react-router-dom";

const Home = () => {
  const [issues, setIssues] = useState([]);
  useEffect(() => {
    const fetchIssues = async () => {
      const response = await IssueService.getAllIssues();
      setIssues(response.issues);
    };
    fetchIssues();
  }, []);

  const handleDelete = async (id) => {
    await IssueService.deleteIssue(id);
    setIssues(issues.filter((issue) => issue.id !== id));
  };

  return (
    <div>
      <h1>Issues</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>
            {issue.title}
            <button onClick={() => handleDelete(issue.id)}>Delete</button>
            <Link to={`/edit/${issue.id}`}>Edit</Link>
          </li>
        ))}
      </ul>
      <Link to="/new">Create New Issue</Link>
    </div>
  );
};

export default Home;
