// @flow

import React, { Component } from 'react';
import SplitPane from 'react-split-pane';
import SidePanel from './components/side-panel';
import './App.css';

const sidePanel = (
  <SplitPane split="vertical" defaultSize="30%">
    <SidePanel />
    <div />
  </SplitPane>
);

class App extends Component<{}> {
  render() {
    return sidePanel;
  }
}

export default App;
