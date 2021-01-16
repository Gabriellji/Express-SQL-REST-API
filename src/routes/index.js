const { Router } = require('express');
const { query } = require('../connection');
const connection = require('../connection');

const router = Router();

router.get('/', (req, res) => {
    res.json({ message: 'Service is running!' });
})

router.get('/anime', (req, res) => {
    const sql = 'SELECT * FROM anime_list';
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        } else {
            return res.status(200).json(results);
        }
    })
})

router.get('/anime/:id', (req, res) => {
    const animeId = req.params.id;
    const sql = 'SELECT * FROM anime_list WHERE id=?';
    const sqlValues = [animeId];
    connection.query(sql, sqlValues, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        } else {
            if (!results[0]) {
                res.status(404).json({
                    error: 'Anime not found'
                });
            }
            return res.status(200).json(results[0]);
        }
    })
})

module.exports = router;