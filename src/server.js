const hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');
const CookieAuth = require('hapi-auth-cookie');
const routes = require('./routes.js');

const server = new hapi.Server();

server.connection({
  port: process.env.PORT || 4000
});

server.register([Vision, Inert, CookieAuth], (err) => {
  if (err) throw err;

  server.views({
    engines: { html: Handlebars },
    path: './src/views',
    layoutPath: './src/views/layout',
    layout: 'index'
  });

var options = {
  password: 'm!*"2/),p4:xDs%KEgVr7;e#85Ah^WYC',
  cookie: 'test',
  isSecure: false,
  ttl: 3 * 60 * 1000
}
  server.auth.strategy('base', 'cookie', 'optional', options);

  server.route(routes);
});

module.exports = server;
