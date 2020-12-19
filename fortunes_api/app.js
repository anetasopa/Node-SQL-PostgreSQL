// express -> it is the function with an argument 'express' which we can use
const express = require('express');
const fortunes = require('./fortunes_api.json')

// app -> function with express application witch we can configuration
const app = express();

console.log('test nodemon')

// req -> request, res -> response
// get -> function witch check url with express function
app.get('/fortunes', (req, res) => {

    // // send -> function response object
    // res.send('requesting fortunes')

    // json -> function response file
    res.json(fortunes);
})

app.get('/fortunes/random', (req, res) => {
    // const random_index = Math.floor(Math.random() * fortunes.length);
    // const r_fortune = fortunes[random_index];
    //
    // res.json(r_fortune)

    res.json(fortunes[Math.floor(Math.random() * fortunes.length)])
})

app.get('/fortunes/random/:id', (req, res) => {
    // find -> function witch find specific element with individual argument
    res.json(fortunes.find(f => f.id == req.params.id));
})

module.exports = app;