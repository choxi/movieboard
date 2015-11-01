const serverConfig = require('./config');

require('babel/register')({
  stage: 0,
  optional: ["runtime"],
});

// To ignore webpack custom loaders on server.
serverConfig.webpackStylesExtensions.forEach(function(ext) {
  require.extensions['.' + ext] = function() {};
});

require('./server');
