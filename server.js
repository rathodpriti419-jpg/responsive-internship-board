const express = require("express");
const db = require("./database");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Internship API is running successfully"
  });
});

app.get("/api/internships", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const offset = (page - 1) * limit;

  const totalResult = db
    .prepare("SELECT COUNT(*) AS count FROM internships")
    .get();

  const internships = db
    .prepare("SELECT * FROM internships LIMIT ? OFFSET ?")
    .all(limit, offset);

  const total = totalResult.count;
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    page,
    limit,
    total,
    totalPages,
    data: internships
  });
});

app.get("/api/internships/:id", (req, res) => {
  const internship = db
    .prepare("SELECT * FROM internships WHERE id = ?")
    .get(req.params.id);

  if (!internship) {
    return res.status(404).json({
      error: "Internship not found"
    });
  }

  res.status(200).json(internship);
});

app.post("/api/internships", (req, res) => {
  const {
    title,
    company,
    domain,
    location,
    duration,
    type,
    description,
    skills
  } = req.body;

  if (!title || !company || !domain || !location || !duration || !type) {
  return res.status(400).json({
    error: "Title, company, domain, location, duration and type are required"
  });
}

  const result = db.prepare(`
    INSERT INTO internships
    (title, company, domain, location, duration, type, description, skills)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    title,
    company,
    domain,
    location,
    duration,
    type,
    description || "",
    skills || ""
  );

  const newInternship = db
    .prepare("SELECT * FROM internships WHERE id = ?")
    .get(result.lastInsertRowid);

  res.status(201).json(newInternship);
});
app.put("/api/internships/:id", (req, res) => {
  const {
    title,
    company,
    domain,
    location,
    duration,
    type,
    description,
    skills
  } = req.body;

  if (!title || !company || !domain || !location || !duration || !type) {
    return res.status(400).json({
      error: "Required fields are missing"
    });
  }

  const existing = db
    .prepare("SELECT * FROM internships WHERE id = ?")
    .get(req.params.id);

  if (!existing) {
    return res.status(404).json({
      error: "Internship not found"
    });
  }

  db.prepare(`
    UPDATE internships
    SET title = ?,
        company = ?,
        domain = ?,
        location = ?,
        duration = ?,
        type = ?,
        description = ?,
        skills = ?
    WHERE id = ?
  `).run(
    title,
    company,
    domain,
    location,
    duration,
    type,
    description || "",
    skills || "",
    req.params.id
  );

  const updated = db
    .prepare("SELECT * FROM internships WHERE id = ?")
    .get(req.params.id);

  res.status(200).json(updated);
});
// DELETE internship
app.delete("/api/internships/:id", (req, res) => {
  const existing = db
    .prepare("SELECT * FROM internships WHERE id = ?")
    .get(req.params.id);

  if (!existing) {
    return res.status(404).json({
      error: "Internship not found"
    });
  }

  db.prepare("DELETE FROM internships WHERE id = ?")
    .run(req.params.id);

  res.status(200).json({
    message: "Internship deleted successfully"
  });
});
// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal server error"
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});