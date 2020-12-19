// express -> it is the function with an argument 'express' which we can use
const express = require('express');
const fortunes = require('./fortunes_api.json')

const port = 3000;
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

// listen -> function listening
app.listen(port, () => console.log(`Listening on port ${port}`));