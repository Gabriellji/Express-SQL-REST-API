require('dotenv').config();
const express = require('express');
const createRouter = require('./routes/create/index');
const readRouter = require('./routes/read/index');
const updateRouter = require('./routes/update/index');
const deleteRouter = require('./routes/delete/index');
const app = express();


app.use(express.json());

app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.json({ message: 'Service is running!'});
        return;
    }
    next();
});

app.use('/',
    [
        createRouter,
        readRouter,
        updateRouter,
        deleteRouter
    ]);

module.exports = app;