// react
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from '@src/registerServiceWorker';

// redux
import { Provider } from 'react-redux';
import { Middleware } from 'redux';
import { createStore, applyMiddleware } from 'redux';
// import { initialState } from './types';
import rootReducer from '@src/reducers';

// middlewares
import { promiseMiddleware } from './middlewares/promise_middleware';

// app
import App from '@src/containers/App';

// styles
import '@src/css/index.css';
import '@src/css/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.css';

const middlewares: Array<Middleware> = [
  promiseMiddleware()
];

const store = createStore(
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
