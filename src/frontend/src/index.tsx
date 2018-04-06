// react
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// redux
import { Store, Provider } from 'react-redux';
import { Middleware } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { AppState, initialState } from './types';
import rootReducer from './reducers';

// middlewares
import { promiseMiddleware } from './middlewares/promise_middleware';

// app
import App from './containers/App';

// styles
import './css/index.css';
import './css/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.css';

const middlewares: Array<Middleware> = [
  promiseMiddleware()
];

const store: Store<AppState> = createStore<AppState>(
  rootReducer,
  initialState,
  applyMiddleware(...middlewares)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
