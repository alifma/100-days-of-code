require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    if (token == null) return res.sendStatus(401); 
    if (token !== process.env.API_TOKEN) {
        return res.sendStatus(403);
    }
    next(); 
}

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(authenticateToken);

app.post('/logs', authenticateToken, (req, res) => {
    const { datetime, project, log } = req.body;
    const timestamp = datetime || new Date().toISOString(); 
    const query = `INSERT INTO logs (datetime, project, log) VALUES (?, ?, ?)`;
    db.run(query, [timestamp, project, log], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

app.get('/logs', authenticateToken,  (req, res) => {
    const query = `SELECT * FROM logs`;
    db.all(query, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ logs: rows });
    });
});

app.put('/logs/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { datetime, project, log } = req.body;
    const query = `UPDATE logs SET datetime = ?, project = ?, log = ? WHERE id = ?`;
    db.run(query, [datetime, project, log, id], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Updated successfully", changes: this.changes });
    });
});

app.delete('/logs/:id',authenticateToken,  (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM logs WHERE id = ?`;
    db.run(query, id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Deleted successfully", changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
