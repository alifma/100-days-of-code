const express = require("express");
const db = require("../database");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.post("/", authenticateToken, (req, res) => {
  const { datetime, project, log } = req.body;
  const timestamp = datetime || new Date().toISOString();
  const userId = req.user.id;
  const query = `INSERT INTO logs (datetime, project, log, user) VALUES (?, ?, ?, ?)`;
  db.run(query, [timestamp, project, log, userId], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ id: this.lastID });
  });
});

router.get("/", authenticateToken, (req, res) => {
  const { projectName = "", page = 1, limit = 10 } = req.query;
  const userId = req.user.id;

  let query = "SELECT * FROM logs";
  const conditions = ["user = ?"];
  const params = [userId];

  if (projectName) {
    conditions.push("project LIKE ?");
    params.push(`%${projectName}%`);
  }

  if (conditions.length) {
    query += " WHERE " + conditions.join(" AND ");
  }

  const offset = (page - 1) * limit;
  query += " ORDER BY DATE(datetime) DESC LIMIT ? OFFSET ?";
  params.push(parseInt(limit), parseInt(offset));

  const countQuery = `SELECT COUNT(id) AS total FROM logs WHERE ${conditions.join(
    " AND "
  )}`;

  db.get(countQuery, params.slice(0, -2), (err, totalResult) => {
    if (err) return res.status(500).json({ error: err.message });

    db.all(query, params, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({
          logs: rows,
          total: totalResult.total,
          page,
          limit,
          totalPages: Math.ceil(totalResult.total / parseInt(limit)),
        });
      }
    });
  });
});

router.put("/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { datetime, project, log } = req.body;
  const query = `UPDATE logs SET datetime = ?, project = ?, log = ? WHERE id = ?`;
  db.run(query, [datetime, project, log, id], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: "Updated successfully", changes: this.changes });
  });
});

router.delete("/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM logs WHERE id = ?`;
  db.run(query, id, function (err) {
    if (err) res.status(500).json({ error: err.message });
    else res.json({ message: "Deleted successfully", changes: this.changes });
  });
});

module.exports = router;
