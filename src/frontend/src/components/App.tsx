import * as React from 'react';
import Sidebar from './Sidebar';
import SidebarContent from './SidebarContent';
import PageContent from './PageContent';
import { Gpx, GPXFormData, NewGpxCallback } from '../types/index';

// import PersistentDrawer from '../components/PersistentDrawer';

import { AppActions } from '../actions/index';

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

  public onSetSidebarOpen(event: React.SyntheticEvent<EventTarget>, open: boolean): void {
    this.setState({sidebarOpen: open});
    event.preventDefault();
  }

  public render(): JSX.Element {
    const { tracks } = this.props.gpx;
    const sidebarContent = <SidebarContent />;

    return (
      <div>
        {/* <PersistentDrawer tracks={tracks} newGpx={this.newGpx} /> */}
        <Sidebar
          sidebar={sidebarContent}
          open={this.state.sidebarOpen}
          onSetOpen={this.onSetSidebarOpen}
        >
          <PageContent tracks={tracks} onSetOpen={this.onSetSidebarOpen} />
        </Sidebar>
      </div>
    );
  }
}

export default App;
