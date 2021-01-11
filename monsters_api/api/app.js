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

        response.redirect('/monsters');
        //response.json({message: 'One row added to DB'});
    });
});

app.put('/monsters/:id', (request, response, next) => {
    const { id } = request.params;
    const key = ['name', 'personality'];
    const fields = [];

    key.forEach(key => {
        if (request.body[key]) fields.push(key);
    })

    fields.forEach((field, index) => {
        pool.query(`UPDATE monsters Set ${field}=($1) WHERE id=($2)`,
            [request.body[field], id],
            (err, res) => {
                if (err) return next(err);

                if (index === fields.length - 1) response.redirect('/monsters');
                // response.redirect('/monsters');
                // response.json(res.rows);
            }
        );
    })

    // pool.query('UPDATE monsters Set name=($1), personality=($2) WHERE id=($3)',
    //     [name, personality, id],
    //     (err, res) => {
    //         if (err) return next(err);
    //
    //         response.redirect('/monsters');
    //         // response.json(res.rows);
    //     }
    // );

});

app.delete('/monsters/:id', (request, response, next) => {
    const { id } = request.params;

    pool.query('DELETE FROM monsters WHERE id=($1)',
        [id],
        (err, res) => {
            if (err) return next(err);

            response.redirect('/monsters');
            // response.json({message: 'One row added to DB'});
        });
});

app.get('/habitats', (request, response, next) => {
    pool.query('SELECT * FROM habitats ORDER BY id ASC', (err, res) => {
            if (err) return  next(err);

            response.json(res.rows);
        }
    );
});

app.post('/habitats', (request, response, next) => {
    const { name, climate, temperature } = request.body;

    pool.query('INSERT INTO habitats(name, climate, temperature) VALUES($1, $2, $3)',
        [name, climate, temperature],
        (err, res) => {
            if (err) return response.json({message: 'Error'});

            response.redirect('/habitats');
            //response.json({message: 'One row added to DB'});
        });
});

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