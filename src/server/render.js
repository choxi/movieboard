import Template from './template';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import config from './config';
import configureStore from '../common/store/configureStore';
import routes from '../common/routes';
import serialize from 'serialize-javascript';
import {Provider} from 'react-redux';
import {RoutingContext, match} from 'react-router';
import createLocation from 'history/lib/createLocation';

export default function render(req, res, next) {
  const initialState = {
    // put initial state stuff here
  };

  const store = configureStore(initialState);

  const location = createLocation(req.url);

  match({routes, location}, (error, redirectLocation, renderProps) => {


    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      return;
    }

    if (error) {
      next(error);
      return;
    }

    fetchComponentData(store.dispatch, req, renderProps)
      .then(() => renderPage(store, renderProps, req))
      .then(html => res.send(html))
      .catch(next);
  });
}

function fetchComponentData(dispatch, req, renderProps) {
  let components = renderProps && renderProps.components || [];

  const needs = components.reduce((prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
      .concat(prev);
    }, []);
  const promises = needs.map(need => dispatch(need()));
  return Promise.all(promises);
}

function renderPage(store, renderProps, req) {
  const clientState = store.getState();
  const {headers, hostname} = req;
  const appHtml = getAppHtml(store, renderProps);
  const scriptHtml = getScriptHtml(clientState, headers, hostname);

  return '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
    <Template
      appCssHash={config.assetsHashes.appCss}
      bodyHtml={`<div id="app">${appHtml}</div>${scriptHtml}`}
      isProduction={config.isProduction}
      title={'MovieBoard'}
    />
  );
}

function getAppHtml(store, renderProps) {
  return ReactDOMServer.renderToString(
    <RoutingContext {...renderProps} />
  );
}

function getScriptHtml(clientState, headers, hostname) {

  const appScriptSrc = config.isProduction
    ? '/_assets/bundle.js?' + config.assetsHashes.appJs
    : `//${hostname}:${config.port}/static/bundle.js`;

  // Note how clientState is serialized. JSON.stringify is anti-pattern.
  // https://github.com/yahoo/serialize-javascript#user-content-automatic-escaping-of-html-characters
  return `
    <script>
      window.__INITIAL_STATE__ = ${serialize(clientState)};
    </script>
    <script src="${appScriptSrc}"></script>
  `;
}
