// @flow

import React, { Component } from 'react';

import SidePanelButtons from '../../components/side-panel-buttons';

type Props = {
  buttonData: Array<{
    name: string,
    route: string,
  }>,
};

class SidePanel extends Component<Props, {}> {
  sidePanelButtons = () => {
    const { buttonData } = this.props;
    return React.createElement(SidePanelButtons, { buttonData });
  };

  render() {
    return this.sidePanelButtons();
  }
}

export default SidePanel;
