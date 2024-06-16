import { useState } from "react";
import IssueService from "../services/IssueService";

const NewIssue = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await IssueService.createIssue({ title, description });
    if (response.issue) {
      setMessage("Issue created successfully");
      setTitle("");
      setDescription("");
    } else {
      setMessage("Failed to create issue");
    }
  };

  return (
    <div>
      <h1>Create New Issue</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Create Issue</button>
      </form>
    </div>
  );
};

export default NewIssue;
