const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./devlog.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error when creating the database', err);
    } else {
        console.log('Database created!');
        initialize();
    }
});

function initialize() {
    db.run(`CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        datetime TEXT NOT NULL,
        project TEXT NOT NULL,
        log TEXT NOT NULL,
        user INTEGER NULL
    );`, (err) => {
        if (err) {
            console.error("Error initializing database table", err);
        } else {
            console.log("Table initialized")
        }
    });
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    );`);
}

module.exports = db;
