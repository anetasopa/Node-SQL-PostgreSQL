const express = require('express');
const pool = require('./pool');
const bodyParser = require('body-parser');
const monsters = require('../api/monsters');
const habitats = require('../api/habitats');

const app = express();

app.use(bodyParser.json());
app.use('/monsters', monsters);
app.use('/habitats', habitats);

app.get('/init-db', (request, response, next) => {
    const query = `
        CREATE TABLE butter(
            id serial,
            name character varying(50),
            climate character varying(50),
            temperature int
        );
            
        INSERT INTO butter(name, climate, temperature)
        VALUES
        ('desert', 'dry', 100),
        ('forrest', 'haunted', 70),
        ('mountain', 'icy', 30);
    `;

    pool.query(query, (err, res) => {
            if (err) return  next(err);

            response.json(res.rows);
        }
    );
});


const port = 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));