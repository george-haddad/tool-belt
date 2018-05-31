// @flow

import React, { Component } from 'react';

class AboutPanel extends Component<{}, {}> {
  aboutPage = () => <div>About Page</div>;

  render() {
    return this.aboutPage();
  }
}

export default AboutPanel;
