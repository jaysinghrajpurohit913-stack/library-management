const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const router = require('./routes/book.routes');
app.use('/add', router);

module.exports = app;