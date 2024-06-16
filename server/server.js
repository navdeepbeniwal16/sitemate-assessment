const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 8000;

const issues = [
  {
    id: "1",
    title: "Bug in login functionality",
    description: "User cannot log in with valid credentials.",
  },
  {
    id: "2",
    title: "UI enhancement for dashboard",
    description: "Improve layout and responsiveness of the main dashboard.",
  },
  {
    id: "3",
    title: "Performance optimization for data processing",
    description: "Optimize algorithms for faster data processing.",
  },
];

// Middleware to manage CORS
app.use(cors());

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Helper function to find issue by id
const getIssueById = (id) => {
  return issues.find((issue) => issue.id === id);
};

// Middleware to check if an issue exists
const issuePresenceCheck = (req, res, next) => {
  const requestedIssueId = req.params.id;
  const requestedIssue = getIssueById(requestedIssueId);

  if (!requestedIssue) {
    return res.status(404).send({ message: "Issue requested not found." });
  }

  req.issue = requestedIssue;
  next();
};

// Routes
app.get("/", (req, res) => {
  res.status(200).send("Issues-Tracker express server is up...");
});

// REST endpoint to fetch all available issues
app.get("/issue", (req, res) => {
  const message =
    issues.length === 0 ? "No issues found" : "Successfully retrieved issues";
  res.status(200).send({
    message,
    issues,
  });
});

// REST endpoint to fetch issue using 'id'
app.get("/issue/:id", issuePresenceCheck, (req, res) => {
  res.status(200).send({
    message: "Successfully retrieved issue",
    issue: req.issue,
  });
});

// REST endpoint to create a new issue
app.post("/issue", (req, res) => {
  const { title, description } = req.body;

  if (
    !title ||
    !description ||
    typeof title !== "string" ||
    typeof description !== "string"
  ) {
    return res.status(400).send({
      message:
        "'title' & 'description' need to be not null and of string type.",
    });
  }

  // Create new issue object and add it to list of issues
  const newIssue = {
    id: String(issues.length + 1),
    title,
    description,
  };
  issues.push(newIssue);
  console.log("New issue added:", newIssue);

  res.status(201).send({
    message: "Successfully created issue",
    issue: newIssue,
  });
});

// REST endpoint to update an issue
app.put("/issue/:id", issuePresenceCheck, (req, res) => {
  const { title, description } = req.body;
  const currentIssueState = req.issue;

  if (title && typeof title === "string") {
    currentIssueState.title = title;
  }

  if (description && typeof description === "string") {
    currentIssueState.description = description;
  }

  console.log("Issue updated", currentIssueState);

  res.status(200).send({
    message: "Successfully updated issue",
    issue: currentIssueState,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Issues-Tracker express server is listening on port: ${PORT}`);
});
