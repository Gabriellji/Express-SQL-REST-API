require('dotenv').config();
const express = require('express');
const indexRouter = require('./routes/index')
const app = express();


app.use(express.json());

app.use('/', indexRouter)

// app.use('/', (req, res, next) => {
//     if (req.originalUrl === '/') {
//         res.send('Service is running!');
//         return;
//     }
//     next();
// });

module.exports = app;