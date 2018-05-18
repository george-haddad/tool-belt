// @flow

import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import SidePanel from './components/side-panel';
import AxfrPanel from './components/axfr';
import './App.css';

const sidePanel = (
  <SplitPane split="vertical" defaultSize="200">
    <SidePanel />
    <AxfrPanel />
  </SplitPane>
);

class App extends Component<{}> {
  render() {
    return sidePanel;
  }
}

export default App;
