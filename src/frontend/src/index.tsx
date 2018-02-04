// react
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// redux
import { Store, Provider } from 'react-redux';
import * as Redux from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { AppState } from './types/index';
import rootReducer from './reducers/index';

// middlewares
import * as promiseMiddleware from 'redux-promise';
import { createLogger } from 'redux-logger';

// app
import App from './components/App';

// styles
import './css/index.css';
import './css/mapbox-gl.css';

const middlewares: Array<Redux.Middleware> = [
  promiseMiddleware
];

if (process.env.NODE_ENV === `development`) {
  const loggerMiddleware: Redux.Middleware = createLogger();
  middlewares.push(loggerMiddleware);
}

const store: Store<AppState> = createStore<AppState>(
  rootReducer,
  applyMiddleware(...middlewares)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
