// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SidePanel from './containers/side-panel';
import AxfrPanel from './containers/axfr-panel';
import AboutPanel from './containers/about-panel';
import './App.css';

type Props = {
  classes: any,
};

const styles = () => ({
  root: {
    flexGrow: 1,
    alignItems: 'flex-start',
  },
});

class App extends Component<Props, {}> {
  mainPanel = () => {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <Grid container spacing={8}>
            <Grid item xs={12} sm={3} md={1} lg={1} xl={1}>
              <SidePanel
                buttonData={[
                  { name: 'AXFR', route: '/axfr' },
                  { name: 'Space-X', route: '/spacex' },
                  { name: 'About', route: '/about' },
                ]}
              />
            </Grid>

            <Grid item xs={12} sm={9} md={10} lg={10} xl={11}>
              <Route exact path="/axfr" component={AxfrPanel} />
              <Route exact path="/about" component={AboutPanel} />
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  };

  render() {
    return this.mainPanel();
  }
}

export default withStyles(styles)(App);
