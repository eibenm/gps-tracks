import * as React from 'react';
import Map, { Record } from './Map';
import PersistentDrawer from '../containers/PersistentDrawer';
import { AppActions } from '../actions/index';

interface Props {
  gpx: { records: Array<Record> };
  getGpx: () => AppActions;
}

interface State { }

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.getGpx = this.getGpx.bind(this);
  }

  public getGpx(): void {
    this.props.getGpx();
  }

  public render(): JSX.Element {
    const { records } = this.props.gpx;
    return (
      <div>
        <Map records={records} getGpx={this.getGpx} />
        <PersistentDrawer />
      </div>
    );
  }
}

export default App;
