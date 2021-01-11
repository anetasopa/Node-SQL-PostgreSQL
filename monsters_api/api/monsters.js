const { Router } = require('express');
const pool = require('../api/pool');

const router = Router();


router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM monsters ORDER BY id ASC', (err, res) => {
            if (err) return  next(err);

            response.json(res.rows);
        }
    );
});

router.get('/:id', (request, response, next) => {
    const { id } = request.params;

    pool.query('SELECT * FROM monsters WHERE id = $1',
        [id],
        (err, res) => {
            if (err) return next(err);
            response.json(res.rows);
        }
    );
});

router.post('/', (request, response, next) => {
    const { name, personality } = request.body;

    pool.query('INSERT INTO monsters(name, personality) VALUES($1, $2)',
        [name, personality],
        (err, res) => {
            if (err) return response.json({message: 'Error'});

            response.redirect('/monsters');
            //response.json({message: 'One row added to DB'});
        });
});

router.put('/:id', (request, response, next) => {
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

router.delete('/:id', (request, response, next) => {
    const { id } = request.params;

    pool.query('DELETE FROM monsters WHERE id=($1)',
        [id],
        (err, res) => {
            if (err) return next(err);

            response.redirect('/monsters');
            // response.json({message: 'One row added to DB'});
        });
});

module.exports = router;