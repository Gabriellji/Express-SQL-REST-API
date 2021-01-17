const { Router } = require('express');
const connection = require('../../connection');

const router = Router();

router.delete('/anime/:id', (req, res) => {
    const animeId = req.params.id;
    const sql = "DELETE FROM anime_list WHERE id = ?";
    connection.query(sql, [animeId], (err, results) => {
        if (err) {
            res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        }
        return res.status(200).json({ message: 'Resource deleted successfully'})
    })
})

router.delete('/anime', (req, res) => {
    const sql = "DELETE FROM anime_list WHERE is_checked = 0";
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        }
        const sql2 = 'SELECT * FROM anime_list';
        return connection.query(sql2, (err2, records) => {
            if (err2) {
                res.status(500).json({
                    error: err2.message,
                    sql: err2.sql
                });
            }
            const updatedList = records;
            return res.status(200).json(updatedList);
        });
        // return res.status(200).json({ message: 'All resources deleted successfully'})
    })
})

module.exports = router;