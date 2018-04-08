import * as React from 'react';
import NewTrackForm from './NewTrackForm';
import { Button } from 'reactstrap';
import { Track, GPXFormData } from '../types';

interface Props {
  tracks: Array<Track>;
  newGpx: (data: GPXFormData) => void;
}

interface State {
  showForm: boolean;
}

class SidebarContent extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = { showForm: false };
    this.handleShowForm = this.handleShowForm.bind(this);
    this.saveDataHandler = this.saveDataHandler.bind(this);
  }

  public handleShowForm(event: React.SyntheticEvent<EventTarget>): void {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  public saveDataHandler(data: GPXFormData) {
    this.props.newGpx(data);
  }

  public render(): JSX.Element {
    return(
      <div style={{ padding: 10 }}>
        <div>GPS Tracks</div>
        {this.renderShowFormButton()}
        <hr />
        {this.renderSidbarContent()}
      </div>
    );
  }

  private renderShowFormButton(): JSX.Element {
    const { showForm } = this.state;
    return(
      <Button color={showForm ? 'danger' : 'primary'} onClick={this.handleShowForm}>
        {showForm ? 'Cancel' : 'New Track'}
      </Button>
    );
  }

  private renderSidbarContent(): JSX.Element {
    return(
      <div>
        {this.state.showForm ? this.renderForm() : this.renderTracksList()}
      </div>
    );
  }

  private renderForm(): JSX.Element {
    return(
      <NewTrackForm saveData={this.saveDataHandler} />
    );
  }

  private renderTracksList(): JSX.Element {
    let tracksList: Array<JSX.Element> = [];
    const {tracks} = this.props;
    if (tracks) {
      tracksList = this.props.tracks.map(track => {
        return(
          <li key={track.id}>{track.name}</li>
        );
      });
    }

    return(
      <div>
        <ul>
          {tracksList.length ? tracksList : 'No Tracks'}
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
