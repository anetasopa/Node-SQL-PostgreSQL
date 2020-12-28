// express -> it is the function with an argument 'express' which we can use
const fs = require('fs');
const express = require('express');
let fortunes = require('./fortunes_api.json');
console.log('requiring fortunes data')
const bodyParser = require('body-parser');

// app -> function with express application witch we can configuration
const app = express();

app.use(bodyParser.json());

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

const writeFortunes = json => {
    fs.writeFile('./fortunes_api.json', JSON.stringify(json), err => console.log(err ));
}

const readFortunes = () => {
    return fs.readFileSync('./fortunes_api.json', 'utf8')
}

app.post('/fortunes', (req, res) => {
    // let fortunesFromFile = [];
    // for (let i = 0; i < 100; i++) {
    //     fortunesFromFile.push({ id: i, message: i, luckyNumber: i, spiritAnimal: i })
    // }
    const fortunesFromFile = JSON.parse(readFortunes())

    const { message, luckyNumber, spiritAnimal } = req.body

    const fortuneIds = fortunesFromFile.map(f => f.id)
    //...[1, 2, 3] => 1, 2, 3
    const maxId = Math.max(...fortuneIds)
    const nextId = fortuneIds.length === 0 ? 1 : maxId + 1

    const fortune = {
        id: nextId,
        message,
        luckyNumber,
        spiritAnimal
    }
    const updatedFortunes = fortunesFromFile.concat(fortune)

    writeFortunes(updatedFortunes)
    res.json(fortune)
})

app.put('/fortunes/:id', (req, res) => {
    const fortunesFromFile = JSON.parse(readFortunes())
    const { id } = req.params;

    const oldFortune = fortunesFromFile.find(f => f.id == id);

    const { message, luckyNumber, spiritAnimal } = req.body

    if (oldFortune) {
        if (message) oldFortune.message = message;
        if (luckyNumber) oldFortune.luckyNumber = luckyNumber;
        if (spiritAnimal) oldFortune.spiritAnimal = spiritAnimal;
    }

    writeFortunes(fortunesFromFile);
    res.json(fortunesFromFile);
})

app.delete('/fortunes/:id', (req, res) => {
    const fortunesFromFile = JSON.parse(readFortunes())
    const { id } = req.params;

    const new_fortunes = fortunesFromFile.filter(f => f.id != id);

    writeFortunes(new_fortunes);
    res.json(new_fortunes);
})

module.exports = app;