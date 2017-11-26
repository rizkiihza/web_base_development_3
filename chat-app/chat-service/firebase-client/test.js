var http = require('http');

http.get('http://localhost:3030/token/tokenapp', function(response){
    console.log(response.data);
});