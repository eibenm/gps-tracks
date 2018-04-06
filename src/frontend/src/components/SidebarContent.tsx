import * as React from 'react';

import { Button } from 'reactstrap';

interface Props { }

interface State { }

class SidebarContent extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
  }

  public render(): JSX.Element {
    return(
      <div style={{ padding: 10 }}>
        <div>Sidebar Content</div>
        <Button color="danger">Danger!</Button>
      </div>
    );
  }
}

export default SidebarContent;
