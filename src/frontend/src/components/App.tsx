import * as React from 'react';
import Sidebar from '@src/components/Sidebar';
import SidebarContent from '@src/components/SidebarContent';
import PageContent from '@src/components/PageContent';
import { Gpx, GPXFormData, NewGpxCallback } from '@src/types';

import { AppActions } from '@src/actions';

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

  public newGpx(data: GPXFormData): void {
    this.props.newGpx(data, (success) => {
      if (success === true) {
        this.setState({sidebarOpen: false});
      }
    });
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
    const sidebarContent = (
      <SidebarContent
        tracks={tracks}
        newGpx={this.newGpx} 
        sidebarOpen={this.state.sidebarOpen}
      />
    );

    return (
      <div>
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
