const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((reg, res) => {
    res.end('Welcome to Node!');
})

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`)
})