const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy('/popularity', { target: 'http://localhost:8081/' , pathRewrite: {'^/popularity':'/'}}));
};