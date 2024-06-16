import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IssueService from "../services/IssueService";

const EditIssue = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchIssue = async () => {
      const response = await IssueService.getIssueById(id);
      if (response.issue) {
        setTitle(response.issue.title);
        setDescription(response.issue.description);
      } else {
        setMessage("Issue not found");
      }
    };
    if (id) {
      fetchIssue();
    }
  }, [id]);

  const handleUpdate = async () => {
    const response = await IssueService.updateIssue(id, { title, description });
    if (response.issue) {
      setMessage("Issue updated successfully");
    } else {
      setMessage("Failed to update issue");
    }
  };

  return (
    <div>
      <h1>Edit Issue</h1>
      {message && <p>{message}</p>}
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
      <button onClick={handleUpdate}>Update Issue</button>
    </div>
  );
};

export default EditIssue;
