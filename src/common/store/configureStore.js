import { createStore, applyMiddleware, compose } from 'redux';
import { devTools } from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';
import createHistory from 'history/lib/createBrowserHistory';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import movieDB from '../middleware/movie_db';

const middlewareBuilder = () => {

  let middleware = {};
  let universalMiddleware = [thunk, movieDB];
  let allComposeElements = [];

  if(process.browser) {
    if(['production', 'test'].indexOf(process.env.NODE_ENV) != -1){
      middleware = applyMiddleware(...universalMiddleware);
      allComposeElements = [
        middleware,
        reduxReactRouter({
          createHistory
        })
      ]
    } else {
      middleware = applyMiddleware(...universalMiddleware, createLogger());
      allComposeElements = [
        middleware,
        reduxReactRouter({
          createHistory
        }),
        devTools()
      ]
    }
  } else {
    middleware = applyMiddleware(...universalMiddleware);
    allComposeElements = [
      middleware
    ]
  }
  return allComposeElements;
}

const finalCreateStore = compose(...middlewareBuilder())(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
