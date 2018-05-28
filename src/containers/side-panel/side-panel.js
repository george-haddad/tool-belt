// @flow

import React, { Component } from 'react';

import SidePanelButtons from '../../components/side-panel-buttons';

type Props = {
  buttonNames: Array<string>,
};

class SidePanel extends Component<Props, {}> {
  sidePanelButtons = () => {
    const { buttonNames } = this.props;
    return React.createElement(SidePanelButtons, { buttonNames });
  };

  render() {
    return this.sidePanelButtons();
  }
}

export default SidePanel;
