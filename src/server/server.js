import express from 'express';

import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import render from './render';

import configureStore from '../common/store/configureStore';
import moviedb from '../common/lib/moviedb';
import routes from '../common/routes';
import config from './config';

const app = express();

// -------------------------------------------------------------------------
// Webpack server
// -------------------------------------------------------------------------
if(process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/static', express.static(webpackConfig.output.path));
}

// -------------------------------------------------------------------------
// Main Route
// ------------------------------------------------------------------------
app.get('*', render)


// Start the server-----------------------------------------------------------
const server = app.listen(config.port, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
