import * as React from 'react';
import { AppActions } from '../actions/index';
import Form, { GPXFormData } from './Form';

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
    width: 240
  }],
  ['drawerHeader', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px'
  }]
]);

interface Props {
  test: { test: { data: string } };
  gpx: { newGpxSuccess: boolean };
  getTest: () => AppActions;
  newGpx: (data: GPXFormData) => AppActions;
}

interface State {
  open: boolean;
}

class PersistentDrawer extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = { open: false };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.saveDataHandler = this.saveDataHandler.bind(this);
  }

  public componentDidMount(): void {
    this.props.getTest();
  }

  public componentDidUpdate(): void {
    
    const { test } = this.props.test;
    const { newGpxSuccess } = this.props.gpx;

    if (test) {
      window.console.log(`Test Action Message: ${test.data}`);
    }

    if (newGpxSuccess) {
      window.console.log(`New GPX Sucess: ${newGpxSuccess}`);
    }
  }

  public handleDrawerToggle(event: React.SyntheticEvent<EventTarget>): void {
    this.setState({
      open: !this.state.open
    });
  }

  public saveDataHandler(data: GPXFormData) {
    this.props.newGpx(data);
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
              <IconButton onClick={this.handleDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <Form saveData={this.saveDataHandler} />
          </div>
        </Drawer>
      </div>
    );
  }
}

export default PersistentDrawer;