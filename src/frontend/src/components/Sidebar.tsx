import * as React from 'react';

import './Sidebar.css';

interface Props {
  sidebar: JSX.Element;
  open: boolean;
  onSetOpen: (event: React.SyntheticEvent<EventTarget>, open: boolean) => void;
}

const overlayClickedHandler = (event: React.MouseEvent<HTMLDivElement>, props: Props): void => {
  if (props.open) {
    props.onSetOpen(event, false);
  }
};

const Sidebar: React.SFC<Props> = (props) => {

  const sidebarStyle: React.CSSProperties = { };
  const overlayStyle: React.CSSProperties = { };

  if (props.open === true) {
    sidebarStyle.transform = `translateX(0%)`;
    sidebarStyle.WebkitTransform = `translateX(0%)`;
    overlayStyle.opacity = 1;
    overlayStyle.visibility = 'visible';
  } else {
    sidebarStyle.transform = 'translateX(-100%)';
    sidebarStyle.WebkitTransform = 'translateX(-100%)';
    sidebarStyle.boxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)';
    sidebarStyle.WebkitBoxShadow = '2px 2px 4px rgba(0, 0, 0, 0.15)';
  }

  return(
    <div className="sidebar-root">
      <div className="sidebar-sidebar" style={sidebarStyle}>
        <div className="sidebar-content">
          {/* Sidebar Content */}
          {props.sidebar}
        </div>
      </div>
      <div
        className="sidebar-overlay"
        style={overlayStyle}
        onClick={event => overlayClickedHandler(event, props)}
      />
      <div className="sidebar-page-content">
        {/* Page Content */}
        {props.children}
      </div>
    </div>
  );
};

export default Sidebar;
