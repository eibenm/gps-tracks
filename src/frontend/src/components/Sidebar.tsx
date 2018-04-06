// Inspired By
// https://github.com/balloob/react-sidebar

import * as React from 'react';

import './Sidebar.css';

interface Props {
  sidebar: JSX.Element;
  open: boolean;
  onSetOpen: (open: boolean) => void;
}

interface State { }

class Sidebar extends React.Component<Props, State> {
  
  constructor(props: Props) {
    super(props);
    this.overlayClicked = this.overlayClicked.bind(this);
  }

  public overlayClicked(event: React.SyntheticEvent<EventTarget>): void {
    if (this.props.open) {
      this.props.onSetOpen(false);
    }
  }

  public render(): JSX.Element {

    const sidebarStyle: React.CSSProperties = { };
    const overlayStyle: React.CSSProperties = { };

    if (this.props.open === true) {
      // slide open sidebar
      sidebarStyle.transform = `translateX(0%)`;
      sidebarStyle.WebkitTransform = `translateX(0%)`;
      // show overlay
      overlayStyle.opacity = 1;
      overlayStyle.visibility = 'visible';
    } else {
      sidebarStyle.transform = 'translateX(-100%)';
      sidebarStyle.WebkitTransform = 'translateX(-100%)';
      sidebarStyle.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)';
      sidebarStyle.WebkitBoxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)';
    }

    return (
      <div className="sidebar-root">
        <div className="sidebar-sidebar" style={sidebarStyle}>
          <div style={{width: 300, height: '100%', fontWeight: 300, backgroundColor: 'blue'}}>
            {this.props.sidebar}
          </div>
        </div>
        <div
          className="sidebar-overlay"
          role="presentation"
          tabIndex={0}
          style={overlayStyle}
          onClick={this.overlayClicked}
        />
        <div className="sidebar-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Sidebar;
