// express -> it is the function with an argument 'express' which we can use
const express = require('express');

const port = 3000;
// app -> function with express application witch we can configuration
const app = express();

// req -> request, res -> response
// get -> function witch check url with express function
app.get('/fortunes', (req, res) => {
    console.log('requesting fortunes');
})

// listen -> function listening
app.listen(port, () => console.log(`Listening on port ${port}`));