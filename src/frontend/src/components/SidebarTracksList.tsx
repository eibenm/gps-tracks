import * as React from 'react';
import { Track } from '../types';
import { Table } from 'reactstrap';

import './SidebarTracksList.css';

const viewIcon = require('../icons/eye.svg');

interface Props {
  tracks: Array<Track>;
}

const viewTrack = (event: React.MouseEvent<HTMLAnchorElement>, trackID: number) => {
  event.preventDefault();
  window.console.log(`Viewing Track: ${trackID}`);
};

const tracksList = (tracks: Array<Track>) => {
  let trackElements: Array<JSX.Element> = [];
  if (tracks) {
    trackElements = tracks.map(track => {
      return(
        <tr key={track.id}>
          <td scope="row">{track.name}</td>
          <td scope="row">
            <a href="#" onClick={(e) => viewTrack(e, track.id)}>
              <img src={viewIcon} alt="View" className="icon-eye" />
            </a>
          </td>
        </tr>
      );
    });
  }

  return(
    <Table responsive={true} className="tracks-table">
      <tbody>
        {trackElements}
      </tbody>
    </Table>
  );
};

const TracksList: React.SFC<Props> = (props) => {
  const { tracks } = props;
  return (
    <div>
      {tracks.length ? tracksList(tracks) : 'No Tracks'}
    </div>
  );
};

export default TracksList;
