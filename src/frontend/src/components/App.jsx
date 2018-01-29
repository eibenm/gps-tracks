import React, { Component } from 'react';
import Map from './Map';
import Test from '../containers/Test';

class App extends Component {
  render() {
    return(
      <div>
        <Map />
        <Test />
      </div>
    );
  }
}

export default App;