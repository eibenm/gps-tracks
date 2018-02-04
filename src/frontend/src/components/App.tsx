import * as React from 'react';
import Map from './Map';
// import Test from './Test';
import Test from '../containers/Test';

class App extends React.Component {
  render() {
    return (
      <div>
        <Map />
        <Test />
      </div>
    );
  }
}

export default App;
