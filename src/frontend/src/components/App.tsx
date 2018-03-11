import * as React from 'react';
import Map from './Map';
import { Track, GPXFormData, NewGpxCallback } from '../types/index';
import PersistentDrawer from '../components/PersistentDrawer';
import { AppActions } from '../actions/index';

interface Props {
  gpx: {
    newGpxSuccess: boolean
    tracks: Array<Track>
  };
  newGpx: (data: GPXFormData, callback: NewGpxCallback) => AppActions;
  getGpx: () => AppActions;
}

interface State { }

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.newGpx = this.newGpx.bind(this);
    this.getGpx = this.getGpx.bind(this);
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

  public render(): JSX.Element {
    const { tracks } = this.props.gpx;
    return (
      <div>
        <Map tracks={tracks} />
        <PersistentDrawer tracks={tracks} newGpx={this.newGpx} />
      </div>
    );
  }
}

export default App;
