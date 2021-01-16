const { Router } = require('express');
const connection = require('../connection');

const router = Router();

router.get('/', (req, res) => {
    res.json({message: 'Service is running!'});
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

module.exports = router;