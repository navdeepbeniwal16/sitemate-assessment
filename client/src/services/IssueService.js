// IssueService to interact with backend REST APIs

class IssueService {
  constructor() {
    this.baseUrl = "http://localhost:8000/issue";
  }

  async getAllIssues() {
    const response = await fetch(this.baseUrl);
    return response.json();
  }

  async getIssueById(id) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return response.json();
  }

  async createIssue(issueData) {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issueData),
    });
    return response.json();
  }

  async updateIssue(id, updatedIssueData) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedIssueData),
    });
    return response.json();
  }

  async deleteIssue(id) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    return response.json();
  }
}

export default new IssueService();
