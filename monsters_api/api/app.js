const express = require('express');
const pool = require('./pool');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/monsters', (request, response, next) => {
    pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, res) => {
        if (err) return  next(err);

            response.json(res.rows);
        }
    );
});

app.get('/monsters/:id', (request, response, next) => {
    console.log('/monsters:id');
    const { id } = request.params;
    pool.query('SELECT * FROM monsters WHERE id = $1',
        [id],
        (err, res) => {
            if (err) return next(err);
            response.json(res.rows);
            }
        );
});

app.post('/monsters', (request, response, next) => {
    const { name, personality } = request.body;

    pool.query('INSERT INTO monsters(name, personality) VALUES($1, $2)',
        [name, personality],
        (err, res) => {
        if (err) return response.json({message: 'Error'});

        response.json({message: 'One row added to DB'});
    });
});

const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));