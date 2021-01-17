const { Router } = require('express');
const connection = require('../../connection');

const router = Router();

router.post('/anime', (req, res) => {
    const { title, year, episodes, is_checked } = req.body;
    if (!title) {
        return res.status(422).json({
            error: 'required field(s) missing'
        });
    }
    const sql = 'INSERT INTO anime_list SET ?';
    connection.query(sql, req.body, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        }
        const sql2 = 'SELECT * FROM anime_list WHERE id=?';
        connection.query(sql2, results.insertId, (err2, records) => {
            if (err2) {
                res.status(500).json({
                    error: err2.message,
                    sql: err2.sql
                });
            }
            return res.status(201).json(records[0]);
        });
    });
})


module.exports = router;