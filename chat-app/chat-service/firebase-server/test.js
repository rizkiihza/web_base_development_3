var request = require('request');

const url='http://localhost:3030/token/tokenapp/'

request.get(url + "1", (error, response, body) => {
    let json = JSON.parse(body);
    console.log(json)
})