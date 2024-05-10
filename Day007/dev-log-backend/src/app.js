const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./api/users'));
app.use('/api/logs', require('./api/logs'));

module.exports = app;
