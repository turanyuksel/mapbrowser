const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');

server.use(jsonServer.defaults());

server.get('/getPopularity', (req, res) => {
    res.jsonp({ ...req.query, popularity: 123});
});

server.use(router);
server.listen(54321, () => {
    console.log('JSON Server started.')
})