const express = require('express');
const pool = require('./pool');

const app = express();

app.get('/monsters', (request, response, next) => {
    console.log('GET /monsters');
    pool.query('SELECT * FROM monsters WHERE id = 1', (err, res) => {
        if (err) return  next(err);

        response.json(res.rows);
    });
});

app.use((err, req, res, next) => {
    res.join(err);
});

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));