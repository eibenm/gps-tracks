import * as React from 'react';
import Map from './Map';
import { Track } from '../types';

const menuIcon = require('./menu-icon.svg');

import './PageContent.css';

interface Props {
  tracks: Array<Track>;
  onSetOpen: (event: React.SyntheticEvent<EventTarget>, open: boolean) => void;
}

interface State { }

class PageContent extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.menuIconClickedHander = this.menuIconClickedHander.bind(this);
  }

  public menuIconClickedHander(event: React.SyntheticEvent<EventTarget>): void {
    this.props.onSetOpen(event, true);
  }

  public render(): JSX.Element {
    return(
      <div>
        <span>
          <a href="#" onClick={this.menuIconClickedHander} className="menu-icon">
            <img src={menuIcon} alt="menu" />
          </a>
        </span>
        <Map tracks={this.props.tracks} />
    </div>
    );
  }
}

export default PageContent;
