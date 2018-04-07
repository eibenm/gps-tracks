import * as React from 'react';

import { Button } from 'reactstrap';

interface Props { }

interface State {
  showForm: boolean;
}

class SidebarContent extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.state = { showForm: false };
  }

  public render(): JSX.Element {
    return(
      <div style={{ padding: 10 }}>
        <div>GPS Tracks</div>
        <Button color="danger">Danger!</Button>
      </div>
    );
  }
}

export default SidebarContent;
