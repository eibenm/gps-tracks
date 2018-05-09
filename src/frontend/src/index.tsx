import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from '@src/registerServiceWorker';
import App from '@src/containers/App';
import { AppState } from '@src/store';
import configureStore from '@src/configureStore';

import '@src/css/index.css';
import '@src/css/mapbox-gl.css';
import 'bootstrap/dist/css/bootstrap.css';

const initialState: AppState = {
  gpx: {
    newGpxSuccess: false,
    tracks: [],
  },
};

ReactDOM.render(
  <Provider store={configureStore(initialState)}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
