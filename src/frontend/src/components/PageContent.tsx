import * as React from 'react';
import Map from '@src/components/Map';
import { Track } from '@src/types';

import '@src/components/PageContent.css';

interface Props {
  tracks: Array<Track>;
  onSetOpen: (event: React.SyntheticEvent<EventTarget>, open: boolean) => void;
}

const PageContent: React.SFC<Props> = (props) => {
  return (
    <div>
      <div className="navbar-dark menu-icon">
        <button className="navbar-toggler" type="button" onClick={event => props.onSetOpen(event, true)}>
          <span className="navbar-toggler-icon"/>
        </button>
      </div>
      <Map tracks={props.tracks} />
    </div>
  );
};

export default PageContent;
