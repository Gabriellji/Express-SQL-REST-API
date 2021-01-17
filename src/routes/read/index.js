const { Router } = require('express');
const connection = require('../../connection');

const router = Router();

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

router.get('/search', (req, res) => {
    const { title, year } = req.query;
    if (title) {
        connection.query(
            `SELECT * from anime_list WHERE title LIKE '%${title}%'`,
            (err, results) => {
                if (err) {
                    res.status(500).json({
                        error: err.message,
                        sql: err.sql,
                    });
                } else {
                    if (!results.length) {
                        res.status(404).json({
                            error: 'Anime not found'
                        });
                    }
                    return res.status(200).json(results);
                }
            }
        );
    } else if (year) {
        connection.query(
            `SELECT * from anime_list WHERE year > '${year}'`,
            (err, results) => {
                if (err) {
                    res.status(500).json({
                        error: err.message,
                        sql: err.sql,
                    });
                } else {
                    if (!results.length) {
                        res.status(404).json({
                            error: 'Anime not found'
                        });
                    }
                    return res.status(200).json(results);
                }
            }
        );
    }
})

router.get('/anime/sort/:sort', (req, res) => {
    const sql = `SELECT * FROM anime_list ORDER BY year ${req.params.sort}`;
    connection.query(sql, (err, results) => {
        if (err) {
            if (req.params.sort !== 'desc' || req.params.sort !== 'asc') {
                res.status(422).json({
                    error: 'Required parameters of sort: desc or asc'
                });
            }
            res.status(500).json({
                error: err.message,
                sql: err.sql,
            });
        }
        return res.status(200).json(results);
    })

})

module.exports = router;