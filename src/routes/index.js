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

router.get('/search', (req, res) => {
    const { title, year } = req.query;
    if (title) {
        connection.query(
            `SELECT * from anime_list WHERE title LIKE '%${title}%'`,
            // [req.query.title],
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
            // [req.query.title],
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
    res.status(400).json({ error: 'Invalid request' })
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

module.exports = router;