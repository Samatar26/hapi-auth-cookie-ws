// const CookieAuth = require('hapi-auth-cookie');
// const credentials = require('hapi-context-credentials');
const home = {
  method: 'GET',
  path: '/',
  handler: (req, reply)=> {
    reply.view('index');
  }
}

const fileServer = {
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: './public'
    }
  }
}

const login = {
  method: 'POST',
  path: '/login',
  handler: (req, reply)=> {
    var username = req.payload.username;
    var password = req.payload.password;
    req.cookieAuth.set({username});


    reply.view('user-page', {
      credentials: req.auth.credentials

    });
  }
}

const authRoute = {
  method: 'GET',
  path: '/auth-only',
  handler: (request, reply) =>{
    reply('You\'re not authenticated :(');
  }
}

module.exports = [
  home,
  fileServer,
  login,
  authRoute
]
