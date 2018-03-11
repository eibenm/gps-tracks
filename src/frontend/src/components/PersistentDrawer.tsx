import * as React from 'react';
import Form from './Form';
import { Track, GPXFormData, NewGpxCallback } from '../types/index';

// material-ui
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import MenuIcon from 'material-ui-icons/Menu';

const styles: ReadonlyMap<string, React.CSSProperties> = new Map<string, React.CSSProperties>([
  ['drawerInner', {
    // Make the items inside not wrap when transitioning:
    width: 300
  }],
  ['drawerHeader', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px'
  }]
]);

interface Props {
  tracks: Array<Track>;
  newGpx: (data: GPXFormData,  callback: NewGpxCallback) => void;
}

interface State {
  open: boolean;
  showForm: boolean;
}

class PersistentDrawer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { open: false, showForm: false };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleShowForm = this.handleShowForm.bind(this);
    this.saveDataHandler = this.saveDataHandler.bind(this);
  }

  public handleDrawerToggle(event: React.SyntheticEvent<EventTarget> | null): void {
    this.setState({
      open: !this.state.open,
      showForm: false
    });
  }

  public handleShowForm(event: React.SyntheticEvent<EventTarget>): void {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  public saveDataHandler(data: GPXFormData) {
    this.props.newGpx(data, (success) => {
      if (success === true) {
        this.handleDrawerToggle(null);
      }
    });
  }

  public render(): JSX.Element {
    return(
      <div>
        <Button
          variant="raised"
          color="default"
          size="small"
          onClick={this.handleDrawerToggle}
          style={{ top: '10px', left: '10px' }}
        >
          <MenuIcon />
        </Button>
        <Drawer variant="persistent" anchor="left" open={this.state.open}>
          <div style={styles.get('drawerInner')}>
            <div style={styles.get('drawerHeader')}>
              {this.renderShowFormButton()}
              <IconButton onClick={this.handleDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            {this.renderDrawerContent()}
          </div>
        </Drawer>
      </div>
    );
  }

  private renderShowFormButton(): JSX.Element {
    const { showForm } = this.state;
    return(
      <Button variant="raised" color={showForm === true ? 'secondary' : 'primary'} onClick={this.handleShowForm}>
        {showForm === true ? 'Cancel' : 'New Track'}
      </Button>
    );
  }

  private renderDrawerContent(): JSX.Element {
    return(
      <div>
        {this.state.showForm === true ? this.renderForm() : this.renderTracksList()}
      </div>
    );
  }

  private renderForm(): JSX.Element {
    return(
      <Form saveData={this.saveDataHandler} />
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

export default PersistentDrawer;