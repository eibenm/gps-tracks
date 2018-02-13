import * as React from 'react';
import Map from './Map';
import PersistentDrawer from '../containers/PersistentDrawer';

class App extends React.Component<{}, {}> {

  constructor(props: {}) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Map />
        <PersistentDrawer />
      </div>
    );
  }
}

export default App;
