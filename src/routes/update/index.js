const { Router } = require('express');
const connection = require('../../connection');

const router = Router();

router.put("/anime/:id", (req, res) => {
    const animeId = req.params.id;
    const newAnime = req.body;
    const sql = "UPDATE anime_list SET ? WHERE id = ?";
    const sqlValues = [newAnime, animeId];
    connection.query(sql, sqlValues, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        }
        const sql2 = 'SELECT * FROM anime_list WHERE id=?';
        return connection.query(sql2, animeId, (err2, records) => {
            if (err2) {
                res.status(500).json({
                    error: err2.message,
                    sql: err2.sql
                });
            }
            const insertedAnime = records[0];
            return res.status(200).json(insertedAnime);
        });
    }
    );
});

router.put('/anime/list/:id', (req, res) => {
    const animeId = req.params.id;
    const sql = "UPDATE anime_list SET is_checked = !is_checked WHERE id = ?";
    connection.query(sql, [animeId], (err, results) => {
        if (err) {
            res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        }
        const sql2 = 'SELECT * FROM anime_list WHERE id=?';
        return connection.query(sql2, animeId, (err2, records) => {
            if (err2) {
                res.status(500).json({
                    error: err2.message,
                    sql: err2.sql
                });
            }
            const insertedAnime = records[0];
            return res.status(200).json(insertedAnime);
        });
    })
})

module.exports = router;