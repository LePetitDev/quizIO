require('babel/register')({
  blacklist: ['regenerator']
});
require('./app.js');