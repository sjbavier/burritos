var server = require('express')();
var bodyParser = require('body-parser');

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

const port = 4000

const ingredients = [
    { id: 1, name: 'refried beans', added: false },
    { id: 2, name: 'black beans', added: false },
    { id: 3, name: 'cheese', added: false },
    { id: 4, name: 'rice', added: false },
    { id: 5, name: 'roasted peppers', added: false },
    { id: 6, name: 'corn', added: false },
    { id: 7, name: 'salsa', added: false },
    { id: 8, name: 'onion', added: false },
    { id: 9, name: 'sour cream', added: false },
    { id: 10, name: 'chicken', added: false },
    { id: 11, name: 'chorizo', added: false },
    { id: 12, name: 'tofu', added: false }
  ]

server.post('/api/v1/burrito', function(req, res, next) {
    console.log(req.body);
    res.json({message: 'Burrito Made!'})
})
server.get('/api/v1/ingredients', function(req, res, next) {
    res.json({data: ingredients});
})

server.listen(port);
console.log(`Express server started on port ${port}`);