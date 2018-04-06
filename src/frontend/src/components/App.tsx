import * as React from 'react';
// import Map from './Map';
import { Gpx, GPXFormData, NewGpxCallback } from '../types/index';
// import PersistentDrawer from '../components/PersistentDrawer';
import { AppActions } from '../actions/index';

import Sidebar from './Sidebar';

interface Props {
  gpx: Gpx;
  newGpx: (data: GPXFormData, callback: NewGpxCallback) => AppActions;
  getGpx: () => AppActions;
}

interface State {
  sidebarOpen: boolean;
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { sidebarOpen: false };
    this.newGpx = this.newGpx.bind(this);
    this.getGpx = this.getGpx.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  public componentDidMount(): void {
    this.props.getGpx();
  }

  public componentDidUpdate(): void {
    const { newGpxSuccess } = this.props.gpx;
    if (newGpxSuccess) {
      this.props.getGpx();
    }
  }

  public newGpx(data: GPXFormData, callback: NewGpxCallback): void {
    this.props.newGpx(data, callback);
  }

  public getGpx(): void {
    this.props.getGpx();
  }

  public onSetSidebarOpen(open: boolean): void {
    this.setState({sidebarOpen: open});
  }

  public render(): JSX.Element {
    // const { tracks } = this.props.gpx;

    var sidebarContent = <b>Sidebar content</b>;

    return (
      <div>
        {/* <Map tracks={tracks} />
        <PersistentDrawer tracks={tracks} newGpx={this.newGpx} /> */}
        <Sidebar
          sidebar={sidebarContent}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
        >
          <span>
            <a
              href="#"
              style={{textDecorationColor: 'none', color: 'black', padding: 8}}
              onClick={() => { this.onSetSidebarOpen(true); }}
            >
            =
            </a>
            <span> React Sidebar</span>
          </span>
        </Sidebar>
      </div>
    );
  }
}

export default App;
